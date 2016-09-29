#!/usr/bin/ruby -w

puts ARGV.each{|item|
    puts "item #{item}"
}
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

#project.targets.each do |target|
#    puts target.name
#end
