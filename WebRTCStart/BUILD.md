#webrtcb编译
##安装depot_tools
(http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up):


1. 下载源码：`git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git`
2. 添加环境变量：可以添加到~/.bashrc ,也可用用export临时添加环境变量，这里临时添加，`export PATH=$PATH:/path/to/depot_tools`
3. 
然后就可以直接使用fetch和gclient命令了

##安装webrtc
(https://webrtc.org/native-code/ios/)

1. 获取webrtc_ios源码：`fetch --nohooks webrtc_ios`，如果已经有了源码也可用在直接在src文件中用git命令更新,
2. 同步依赖库：`gclient sync`,所以需要更新时可以先git更新，然后sync同步。
3. 构建工程文件有两种方式：
	* 命令行：`gn gen out/ios_64 --args='target_os="ios" target_cpu="arm64"'`
	* XCode: `gn gen out/ios --args='target_os="ios" target_cpu="arm64"' --ide=xcode`
4. bitcode支持：`python build_ios_libs.py --bitcode`

##构建原始XCode项目
1. 生成XCode目录：根据上面教程生成XCode项目，products所在的工程目录以下统称”ios”目录
2. 创建Target:在上面生成的XCode工程中创建新的静态库Target名为“GWebRTC”,并在该target的新增run script `${PROJECT_DIR}/GWebRTC/prase.sh`。
3. 生成obj目录列表文件：将getObjs.sh文件放在ios，并不带参数的执行，生成objfils.txt在ios/GWebRtc文件夹中
4. 生成obj目录到XCode装换关系文件：在工程根目录（必要条件）执行pathConversion.rb文件，该作用主要是搜索已经生成的xcode工程目录，查找xcode工程中的文件路径与该文件在系统实际目录的对应关系，并且保存起来。注意里面固定了三个目录，如果目录结构修改了也需要对这三个参数进行相应修改。
	* ARGV[0]:搜索.ninja的主目录，当前版本直接是`Dir.pwd + "/obj"`
	* ARGV[1]:是保存的文件路径，`Dir.pwd + "/GWebRTC/pathConversConfig.txt"`
	* ARGV[2]:是忽略搜索的路径，也就是说搜索的文件或者目录包含ARGV[2]中的字段都跳过，多个用冒号隔开。当前是`"third_party:test"`。
5. 生成宏定义文件：将GetDefine.rb放在ios目录下。并且执行，该脚本需要三个和上面类似的参数，只是保存文件的目录变为`Dir.pwd + "/GWebRTC/PrefixHeader.pch"`。并且将该生成的pch文件添加到项目的GWebRTC garget中。
6. 将ios/gen目录手动挂在在xcode的Source目录下，因为该目录下的文件是动态生成的，xcode工程目录里面没有.
7. GWebRTC的target设置"prefix header"为`${SRCROOT}/GWebRTC/PrefixHeader.pch`
8. 将PraseProduct.rb、Config.xcconfig文件放在”工程目录/GWeRTC”目录中。点击xcode按钮在xcode中运行
9. 然后在命令行中切换到ios/GWebRTC目录，执行./prase.sh  
10. 然后配置search header和third_part的静态连接库（third_part的头文件也移除出xcode）。这部分要一遍编译一遍调试，手动增加，如果汇编符号没有定义，则直接找到.s后缀的文件加入编译




