#!/usr/bin/ruby -w
require 'logger'
path = Dir.pwd + '/DealLog.log'
if !File::exists?(path)
    file=File.new(path,"w+")
    else
    file = File.open(path, File::WRONLY | File::APPEND)
end
# $logger = Logger.new(STDOUT)  #输出到控制台
$logger = Logger.new(file)  #输出文件
$logger.level = Logger::DEBUG #设定高于这个级别的才会输出
#修改log的输出格式
$logger.formatter = proc { |severity, datetime, progname, msg|
    "#{severity}: #{datetime}: #{msg}\n"
}
file.puts
file.puts
file.puts
file.puts
file.puts(">>>>>>>>>>>>>>>>>>>NEW RUBY BUILD<<<<<<<<<<<<<<<<<\n")

#输出内容
$logger.debug "da#{9+9}fsdfas"
$logger.warn( "warn")
$logger.error "error"
$logger.info [1,2,34,5,6,9]
$logger.fatal "fatal"
$logger.fatal "==========================="
p $logger
