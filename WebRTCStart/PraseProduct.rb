#!/usr/bin/ruby -w

#  PraseProduct.rb
#  Mp4v2Code
#
#  Created by 未成年大叔 on 16/10/21.
#  Copyright © 2016年 MinorUncle. All rights reserved.

require 'xcodeproj'

#groupName = ARGV[0]  .m等文件搜索的组
#targetName = ARGV[1]   目标target
#project_path = ARGV[2]     工程文件路径
#staticFile_path = ARGV[3]  静态.o文件所在路径
#ignoreSourceGroup = ARGV[4]   忽略搜索的路径 ， ':'符号分隔

 groupName = ARGV[0]
 targetName = ARGV[1]
 project_path = ARGV[2]
 staticFile_path = ARGV[3]
 $pathConvertSavePath = ARGV[4]
 $ignoreSourceGroup = ARGV[5]

#groupName = "Source"
#targetName = "GWebRTC"
#project_path = "/Users/zhouguangjin/Desktop/webr/src/out/ios/products.xcodeproj"
#staticFile_path = "/Users/zhouguangjin/Desktop/webr/src/out/ios/GWebRTC/objfils.txt"
#$pathConvertSavePath = "pathConversConfig.txt"
#$ignoreSourceGroup = "third_party:test"


$ignoreSourceGroup = $ignoreSourceGroup.split(":")

puts "groupName:#{groupName}"
puts "targetName:#{targetName}"
puts "project_path:#{project_path}"
puts "staticFile_path:#{staticFile_path}"
puts "ignoreSourceGroup:#{$ignoreSourceGroup}"

def getFileRef(pGroup,fileName)
    if $ignoreSourceGroup.include? pGroup.name
        return nil
    end
#    puts "path:#{pGroup.path},name:#{pGroup.name}"

    fRef = pGroup.files.find { |ref|
#         puts "fileName:#{fileName},ref.path:#{ref.path}"
         fileName.include? ref.path
    }

    if fRef == nil
        for child in pGroup.groups
            fRef = getFileRef(child,fileName)
            if fRef != nil
                break
            end
        end
    end
    fRef
end

def clearTarget(pTarget)
    pTarget.resources_build_phase.clear
    puts "clear target"
end

project = Xcodeproj::Project.open(project_path)
fileArry = Array.new
targets = project.targets
for target in targets
    if target.name == targetName
        break;
    end
end
puts "target:#{target}"
group = project.main_group.find_subpath(groupName, false)
puts "SourceGroupName:#{groupName}"

clearTarget(target);

#file = "obj/webrtc/sdk/rtc_sdk_common_objc/RTCSSLAdapter.o"
#if file.include? "rtc_sdk_common_objc"
#    file["rtc_sdk_common_objc"]="objc/Framework/Classes"
#end
#fRef = getFileRef(group,file)
#puts "file:#{fRef.path},name:#{fRef}"


IO.foreach(staticFile_path){|block|
#    block="json_writer.cc"
#puts "find #{block},group#{group.name}"

#末尾会多一个换行符号
    block.rstrip!
    ninjaFile = File.dirname(project_path)+"/"+File.dirname(block)+".ninja"

#测试是否都存在，
    # if !File.exist?(ninjaFile)
    #   puts ninjaFile
    # end
#
  destPath = nil
  IO.foreach(ninjaFile){|line|
    if (line.include? block)
        line = line.split(" ")
        if line.length < 4
          puts "error format"
          exit
        end
        destPath = line[3]
         break
    end
  }

  if destPath == nil
    puts "error search destPatch"+block
    exit
  else
         if destPath.include? "../../"
                destPath["../../"] = "obj/"
         else
                puts "error destPatch format:"+destPath + "  block:"+block + "don`t need change"
          end

         fRef = getFileRef(group,destPath)
         if fRef != nil
            if !fileArry.include? fRef
              puts "add file:#{fRef.path},name:#{destPath}"
                fileArry.push(fRef)
            end
         else
            puts "not found name:#{block} path:#{destPath}"
            exit
         end
  end
}
puts "add_file_referencesfile:#{fileArry.length} #{fileArry.class}"
target.add_file_references(fileArry)
project.save

