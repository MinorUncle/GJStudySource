#!/usr/bin/ruby -w

#  GetDefine.sh
#  products
#
#  Created by melot on 2017/9/15.
#

#ARGV[0] = search root path
#ARGV[1] = save filepath
#ARGV[2] = ignore Grop


# puts ARGV
require 'pathname'

ARGV[0] = Dir.pwd + "/obj"
ARGV[1] = Dir.pwd + "/GWebRTC/pathConversConfig.txt"
ARGV[2] = "third_party:test:examples"

puts "search root path:"+ARGV[0]+", save filepath:"+ARGV[1] +",ignore Grop:"+ARGV[2]

$definesObj = Array.new()
$destFile = File.new(ARGV[1],"w")
$ignoreGrop = ARGV[2]

def dealFile(filepath)
    aFile = File.new(filepath,"r")
    aFile.each_line{|line|

        if line.include? "target_out_dir"
          subPath = aFile.path.split("out/ios/")[1]
          subPath = subPath.split(".")[0]
          defineValue = "#{subPath}=#{line.split(" = ")[1]}"
          if !$definesObj.include? defineValue
            $definesObj.push defineValue
            $destFile.puts defineValue
          end
          break
        end
    }
    aFile.close()
end

def traverse(filepath)
    if File.directory?(filepath)
        # puts "Dirs:" + filepath
        Dir.foreach(filepath) do |filename|
            if filename != "." and filename != ".."
                traverse(filepath + "/" + filename)
            end
        end
    elsif filepath.include? ".ninja"
        dealFile(filepath)
            # puts "Files:" + filepath
    end
end

traverse(ARGV[0])
$destFile.close()
