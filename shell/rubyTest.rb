#!/usr/bin/ruby -w

key = Array.new()
value = Array.new()

ARGV.each{|item|
    items = item.split(':')
    i = 0
    while i<key.length
        if key[i] == items[0]
            if items[1] == 1
                value[i] = 1
            end
            break
        end
        i = i+1
    end
    if i == key.length
        key.push(items[0])
        value.push(items[1])
    end
}
i=0
while i<key.length
puts(key[i])
puts(value[i])
i = i+1
end


#require 'xcodeproj'
#project_path = '/Users/tongguan/Develop/Mp4v2Code/Mp4v2Code.xcodeproj'
#project = Xcodeproj::Project.open(project_path)
#target = project.targets[0]
#group = project.main_group.find_subpath(File.join('util'), true)
#file_ref = group.find_file_by_path('mp4art.cpp')
#real_path = group.recursive_children()
#addfile = target.add_file_references([file_ref])
#puts "target:#{target}"
#puts "group: #{group}"
#puts "file_ref: #{file_ref}"
#puts "addfile: #{addfile}"
#project.save
#
#project.targets.each do |target|
#    puts target.name
#end
