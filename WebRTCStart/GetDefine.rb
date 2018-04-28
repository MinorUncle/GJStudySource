#!/usr/bin/ruby -w

#  GetDefine.sh
#  products
#
#  Created by melot on 2017/9/15.
#

#ARGV[0] = search root path
#ARGV[1] = save filepath
#ARGV[2] = ignore Grop

ARGV[0] = Dir.pwd + "/obj"
ARGV[1] = Dir.pwd + "/GWebRTC/PrefixHeader.pch"
ARGV[2] = "third_party:test:examples"

$definesObj = Array.new()
$destFile = File.new(ARGV[1],"w")
$ignoreGrop = ARGV[2]
$ignoreGrop = $ignoreGrop.split(":")

def dealFile(filepath)
    aFile = File.new(filepath,"r")
    fristLine = aFile.gets
#    puts filepath
    if(fristLine[0,10] == "defines = ")
        fristLine[0,10] = ""
        fristLine.each_line(" "){|word|
            if word[0,2] == "-D"
                word[0,2] = ""
                if word.include? "="
                    word["="] = " "
                end
                
                if ! $definesObj.include? word
  
                    $definesObj.push(word)
                    word = "#define " + word
                    puts word
                    $destFile.puts word
                end
            end
        }
    end
    aFile.close()
end

def traverse(filepath)
    if File.directory?(filepath)
        puts "Dirs:" + filepath
        Dir.foreach(filepath) do |filename|
            if filename != "." and filename != ".."
                traverse(filepath + "/" + filename)
            end
        end
    elsif filepath.include? ".ninja"
        for ignore in $ignoreGrop
            if filepath.include? ignore
                return
            end
        end
        dealFile(filepath)
            puts "Files:" + filepath
    end
end

$destFile.puts "#ifndef PrefixHeader_pch"
$destFile.puts "#define PrefixHeader_pch"


traverse(ARGV[0])
$destFile.puts "#endif /* PrefixHeader_pch */"
$destFile.close()
