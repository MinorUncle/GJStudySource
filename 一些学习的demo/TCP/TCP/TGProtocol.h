// TGProtocol.h

#ifndef _TGPROTOCOL_HEADER_20130607163243_
#define _TGPROTOCOL_HEADER_20130607163243_

#include <stdio.h>
#include <memory.h>
#include <stdint.h>
#include <time.h>
#include <string.h>

const unsigned short TG_MSG_CONNECTION = 0x1000;

const unsigned short sendstream_delay = 1001;
const unsigned short sendstream_throw_frame = 1002;
const unsigned short sendstream_bps = 1003; //以上三个协议是 发送流时动态调整码率所用

const unsigned short get_encry_key_req = 0x2000;
const unsigned short get_encry_key_resp = 0x2001;
const unsigned short ping_gw_req = 0x2002;
const unsigned short ping_gw_resp = 0x2003;
const unsigned short get_tcs_req = 0x2004;
const unsigned short get_tcs_resp = 0x2005;
const unsigned short ping_tcs_req = 0x2006;
const unsigned short ping_tcs_resp = 0x2007;
const unsigned short login_node_req = 0x2008;
const unsigned short login_node_resp = 0x2009;
const unsigned short set_public_cam_req = 0x2010;
const unsigned short set_public_cam_resp = 0x2011;
const unsigned short set_lock_tesuser_req = 0x2012;
const unsigned short set_lock_tesuser_resp = 0x2013;
const unsigned short logout_node_req = 0x2014;
const unsigned short set_unlock_tesuser_req = 0x2016;
const unsigned short set_unlock_tesuser_resq = 0x2017;
const unsigned short get_vodstream_req = 0x2018;
const unsigned short get_vodstream_resp = 0x2019;
const unsigned short put_vodstream_req = 0x201A;
const unsigned short put_vodstream_resp = 0x201B;
const unsigned short set_vodseek_req = 0x201C;
const unsigned short get_realstream_req = 0x201E;
const unsigned short get_realstream_resp = 0x201F;
const unsigned short put_realstream_req = 0x2020;
const unsigned short put_realstream_resp = 0x2021;
const unsigned short update_cam_list = 0x2022;
const unsigned short get_msgaddr_req = 0x2024;
const unsigned short get_msgaddr_resp = 0x2025;
const unsigned short send_alarmmsg_req = 0x2026;
const unsigned short get_inteligence_req = 0x2027;
const unsigned short get_inteligence_resp = 0x2028;
const unsigned short put_inteligence_req = 0x2029;
const unsigned short put_intelligence_resq = 0x202a;
const unsigned short timeing_inteligence_req = 0x202b;
const unsigned short timeing_inteligence_resp = 0x202c;
const unsigned short client_ptz_control_req = 0x2030;
const unsigned short es_ptz_control_req = 0x2032;
const unsigned short authorize_cam_req = 0x2033;
const unsigned short authorize_cam_resp = 0x2034;
const unsigned short deauthorize_cam_req = 0x2035;
const unsigned short deauthorize_cam_resp = 0x2036;

const unsigned short client_login_req = 0x2038;
const unsigned short client_login_new_req = 0x20a8;
const unsigned short client_login_resp = 0x2039;
const unsigned short get_organization_req = 0x2040;
const unsigned short get_organization_resp = 0x2041;
const unsigned short client_rename_cam_req = 0x2042;
const unsigned short client_rename_resp = 0x2043;
const unsigned short es_rename_cam_req = 0x2044;
const unsigned short es_rename_resp = 0x2045;
const unsigned short client_es_state_req = 0x2046;
const unsigned short client_es_state_resp = 0x2047;

const unsigned short es_upload_req = 0x2048;
const unsigned short es_upload_resp = 0x2049;
//remove by cathy. 2014-10-23
 const unsigned short get_cloudvodstream_req = 0x2050;
 const unsigned short get_cloudvodstream_resp = 0x2051;  
//end remove
const unsigned short download_cloudvodstream_req = 0x2052;
const unsigned short download_cloudvodstream_resp = 0x2053;

//add by miyabi. 2015-04-15
const unsigned short get_alarmmsg_req = 0x2054;
const unsigned short get_alarmmsg_resp = 0x2055;
const unsigned short send_alarmmsg_ex_req = 0x2058;
//end add

//add by cathy. 2014-12-20
const unsigned short get_cam_info_req = 0x2061;
const unsigned short get_cam_info_resp = 0x2062;
// const unsigned short get_cam_property_req = 0x2056;
// const unsigned short get_cam_property_resp = 0x2057;
//end add
const unsigned short esping_tcs_req = 0x2059;
const unsigned short esping_tcs_resp = 0x2060;

//add by miyabi. 2015-04-25
const unsigned short client_talkback_req = 0x2071;
const unsigned short esput_talkback_req = 0x2072;
const unsigned short es_talkback_req = 0x2073;
const unsigned short es_talkback_resp = 0x2074;
const unsigned short clientput_talkback_rep = 0x2075;
const unsigned short clientput_talkback_resp = 0x2076;
const unsigned short client_talkback_resp = 0x2077;
//end add

//add by miyabi. 2015-03-31
const unsigned short PingReq = 0x2079;
const unsigned short PingResp = 0x2080;
const unsigned short GetTimeReq = 0x2081;
const unsigned short GetTimeResp = 0x2082;
const unsigned short SubscribeReq = 0x2083;
const unsigned short SubscribeResp = 0x2084;
const unsigned short SpecialSubscribeReq = 0x2085;
const unsigned short SPecialSubscribeResp = 0x2086;
//end add

//add by miyabi. 2015-06-02
const unsigned short RequestVideoStream = 0x2088;
const unsigned short RequestVideoStreamAck = 0x2089;
const unsigned short GetVSAddrInfo = 0x208A;
const unsigned short VSAddrInfoResult = 0x208B;
const unsigned short QueryRecordPeriod = 0x208C;
const unsigned short RecordPeriodResult = 0x208D;

const unsigned short client_remote_cam_req = 0x2090;
const unsigned short client_remote_cam_resp = 0x2091;
const unsigned short cs_client_notifypic = 0x2094;
     
const unsigned short client_get_gps_info_list_req = 0x2096;
const unsigned short client_get_gps_info_list_resp = 0x2097;


const unsigned short client_get_es_gps_info_req = 0x2098;
const unsigned short client_get_es_gps_info_resp = 0x2099;
//end add

//add by miyabi. 2015-08-06
const unsigned short es_cs_gpsupload_req = 0x209A;
const unsigned short es_cs_gpsupload_resp = 0x209B;
const unsigned short cs_es_capturepic_req = 0x2092;
const unsigned short cs_es_capturepic_resp = 0x2093;
const unsigned short es_cs_uploadfile = 0x2095;


//add by cathy. 2014-11-14 (switch ap)
const unsigned short IPC_IDENTIFY_WIFIAP_REQ = 0xC002;
const unsigned short IPC_IDENTIFY_WIFIAP_RESP = 0xC003;
const unsigned short IPC_IDENTIFY_BINDCAM_REQ = 0xC008;
const unsigned short IPC_IDENTIFY_BINDCAM_RESP = 0xC009;

const unsigned short client_switchap_req = 0xD010;
const unsigned short client_switchap_resp = 0xD011;
//end add

const unsigned short personclient_login_req = 0xEA05;
const unsigned short personclient_login_resp = 0xEA06;
const unsigned short delete_alarmMsg_req = 0xEA07;
const unsigned short delete_alarmMsg_resp = 0xEA08;
const unsigned short SwitchCam_req = 0xEA09;
const unsigned short SwitchCam_resp = 0xEA0A;
const unsigned short feedback_req = 0xEA0B;
const unsigned short feedback_resp = 0xEA0C;
const unsigned short person_realstream_req = 0xEA0D;
const unsigned short person_realstream_resp = 0xEA0E;
const unsigned short refresh_ipclist_req = 0xEA13;
const unsigned short refresh_ipclist_resp = 0xEA14;
const unsigned short setOnlineNum_req = 0xEA15;
const unsigned short setOnlineNum_resp = 0xEA16;

const unsigned short csconnectstates_resp = 0xEA17;

//// ES内部UI与DLL通讯指令
//const short stop_realstream_req = 0xE001; // 停止实时流
//const short stop_vodstream_req = 0xE002; // 停止点播流

// ES与看门狗通讯消息, added by Terry, 2014-04-01

#define WM_SERVER_LIVE		WM_USER + 0xEE02
#define WM_SERVER_EXIT		WM_USER + 0xEE03
#define WM_SERVER_NOCHECK	WM_USER + 0xEEAA

#define SERVER_ID_ES  111
#define SERVER_ID_TCS 1111

// add end;

enum TGERRCODE
{
	ERR_Successful = 0,
	ERR_VodFileIsEmpty = 2,			//找不到该时间段的录像文件
	ERR_VOD_Offline = -1224,		//点播服务器不在线
	ERR_MS_Offline = -231,			//告警服务器不在线
	ERR_NET_Failed = -233,			//网络不通，建议重连
	ERR_Camer_Offline = -7,			//摄像头不在线
	ERR_Decrypt_Failed = -2,		//密码解密失败
};


//ErrCode define
const int IPC_IDENTIFY_NOERROR = 0;
const int IPC_IDENTIFY_USER_EXISTS = -301;				//?????
const int IPC_IDENTIFY_ILLEGAL_DEV = -302;				//????
const int IPC_IDENTIFY_DEV_NOT_ACTIVATED = -303;		//IPC??????
const int IPC_IDENTIFY_SAVE_ACCOUNT_ERR = -304;			//??????????
const int IPC_IDENTIFY_BINDCAM_ALREADY = -305;			//???????,??????
const int IPC_IDENTIFY_DEV_EXPIRED = -306;				//??????
const int IPC_IDENTIFY_BINDCAM_ERROR = -307;			//??????


//end ErrCode define

#pragma pack(push,4)
typedef struct _tagNET_PACKET_HEAD
{
	int8_t  nHeadCRC;       //头校验
	int8_t  nPriority;      //优先级
	int16_t nFrameID;       //传输中定义的帧号
	int32_t nFrameSize;     //帧大小
	int16_t nPacketNum;     //当前为第几包
	int16_t nDataLen;       //当前包中有效数据大小
	int16_t nMsgType;       //MSG type
	union
	{
		int16_t nFrameNum;      //TG_FRAME_HEAD.nFrameNum
		int16_t nErrFlag;       //
	};

	_tagNET_PACKET_HEAD()
	{
		memset(this,0,sizeof(_tagNET_PACKET_HEAD));
	}

	void SetCRC()
	{
		nHeadCRC = 0;
		int8_t *pTemp = (int8_t*)this;
		for(int16_t i=1; i<sizeof(_tagNET_PACKET_HEAD); i++)
		{
			nHeadCRC += pTemp[i];
		}
	}

	bool CheckCRC()
	{
		int8_t cCRC = 0;
		int8_t *pTemp = (int8_t*)this;
		for(int16_t i=1;i<sizeof(_tagNET_PACKET_HEAD);i++)
		{
			cCRC += pTemp[i];
		}

		return (cCRC == nHeadCRC)?true:false;
	}

}NET_PACKET_HEAD;

typedef struct _tagHeartbeatRequest
{
	int64_t lNodeID;
	int32_t nNodeType;
	int16_t nCmdPort;
	int16_t nStreamPort;
	int16_t nRecPort;
	int16_t nCPUUsage;
	int16_t nBandwidth;

	_tagHeartbeatRequest()
	{
		memset(this, 0, sizeof(_tagHeartbeatRequest));
	}

}HEARTBEAT_REQUEST, *LPHEARTBEAT_REQUEST;

typedef struct _tagIPPacket
{
	int16_t wMsg;
	char* pData;
	int32_t nDataLen;
	int32_t dwTimestamp;

	_tagIPPacket()
	{
		memset(this, 0, sizeof(_tagIPPacket));
	}

	~_tagIPPacket()
	{
		if (pData)
			delete[] pData;
	}

}IPPacket, *LPIPPacket;

typedef struct _tagInteligenceResult
{
	time_t lTime;
	int32_t inCount;
	int32_t outCount;
	int32_t manCount;
	int32_t womanCount;
	int32_t childCount;
	int32_t yongCount;
	int32_t midCount;
	int32_t oldCount;

	_tagInteligenceResult()
	{
		memset(this, 0 ,sizeof(_tagInteligenceResult));
	}

}INTELIGENCE_RESULT, *LPINTELIGENCE_RESULT;


typedef struct _tagPingTcsRqeuset
{
	int64_t nodeid;
	int32_t nodetype;
	int16_t cmdPort;  //msport
	int16_t streamPort;
	int16_t recPort;
	int16_t cpuusage;
	int16_t bindwidth;
	char tsIp[32];  //msip
	char tsSecIp[32];
	int16_t tsType; //tsType = 1为随便看看， tsType = 0为收费账户

	_tagPingTcsRqeuset()
	{
		memset(this, 0 ,sizeof(_tagPingTcsRqeuset));
	}

}PingTcsRqeuset;

typedef struct _tagPingTcsRqeusetES
{
	int64_t nodeid;
	int32_t nodetype;
	int16_t cmdPort;  //msport
	int16_t streamPort;
	int16_t recPort;
	int16_t cpuusage;
	int16_t bindwidth;
	char caminfo[1024];

	_tagPingTcsRqeusetES()
	{
		memset(this, 0 ,sizeof(_tagPingTcsRqeusetES));
	}

}PingTcsRqeusetES;

typedef struct _tagPingTcsRqeusetMS
{
	int64_t nodeid;
	int32_t nodetype;
	int16_t msPort;  //msport
	int16_t streamPort;
	int16_t recPort;
	int16_t cpuusage;
	int16_t bindwidth;
	char msIp[32];  


	_tagPingTcsRqeusetMS()
	{
		memset(this, 0 ,sizeof(_tagPingTcsRqeusetMS));
	}

}PingTcsRqeusetMS;

typedef struct _tagPingTcsRqeusetVOD
{
	int64_t nodeid;
	int32_t nodetype;
	int16_t streamPort;
	int16_t cpuusage;
	int16_t bindwidth;
	char vodIp[32];  


	_tagPingTcsRqeusetVOD()
	{
		memset(this, 0 ,sizeof(_tagPingTcsRqeusetVOD));
	}

}PingTcsRqeusetVOD;


typedef struct _tagPingTcsResp
{
	int64_t nodeid;
	int32_t retcode;
	_tagPingTcsResp()
	{
		memset(this, 0 ,sizeof(_tagPingTcsResp));
	}
}PingTcsResp;

typedef struct _tagGetTcsReq
{
	int32_t type;
	char loginName[16];

	_tagGetTcsReq()
	{
		memset(this, 0 ,sizeof(_tagGetTcsReq));
	}

}GetTcsReq;

typedef struct _tagGetTcsResp
{
	char tcsIP[32];
	int32_t port;
	char key[128];
	char version[16];
	int32_t type;
	char des[256];

	_tagGetTcsResp()
	{
		memset(this, 0 ,sizeof(_tagGetTcsResp));
	}
}GetTcsResp;



typedef struct _tagLoginNodeReq
{
	int64_t nodeid;
	int32_t nodetype;
	char userid[16];
	char pwd[128];

	_tagLoginNodeReq()
	{
		memset(this, 0 ,sizeof(_tagLoginNodeReq));
	}

}LoginNodeReq;


typedef struct _tagNET_SERVER_LIVE
{
	int64_t  cNodeID;
	int32_t nNodeType;
	int16_t nCmdPort;
	int16_t nStreamPort;
	int16_t nRecPort;
	int16_t nCpuUsage;
	int16_t nBindWidth;
	char szip1[32];
	char szip2[32];
	int16_t nDemoFlag;

	_tagNET_SERVER_LIVE()
	{
		memset(this,0,sizeof(_tagNET_SERVER_LIVE));
	}

}NET_SERVER_LIVE;

typedef struct _tagESLoginNodeResp
{
	char usertitle[64];
	char usablenum[16];  //可授权摄像头数量  加密
	char returncode[16]; //返回成功与否 0-失败，1-成功， 加密
	char estype[16];	//es类型，区分随便看看和收费账户，加密
	char tsip[32];
	int16_t tscmdport;
	int16_t tsstreamport;

	_tagESLoginNodeResp()
	{
		memset(this, 0 ,sizeof(_tagESLoginNodeResp));
	}

}ESLoginNodeResp;


typedef struct _tagClientLoginNodeResp
{
	char returncode[16]; //返回成功与否 0-失败，1-成功， 加密
	char caminfo[5400];  //
//	int32_t jsontype;
	

	_tagClientLoginNodeResp()
	{
		memset(this, 0 ,sizeof(_tagClientLoginNodeResp));
	}

}ClientLoginNodeResp;

typedef struct _tagLogoutNodeReq
{
	int64_t nodeid;
	char username[16];

	_tagLogoutNodeReq()
	{
		memset(this, 0 ,sizeof(_tagLogoutNodeReq));
	}

}LogoutNodeReq;

typedef struct _tagGetRealStreamReq
{
	char username[16];
	int64_t nodeid;
	int32_t cid;

	_tagGetRealStreamReq()
	{
		memset(this, 0 ,sizeof(_tagGetRealStreamReq));
	}
}GetRealStreamReq;

typedef struct _tagGetRealstreamResp
{
	int64_t nodeid;
	int32_t camid;
	char tsIp[32];
	int16_t tsCmdPort;
	int16_t tsStreamPort;

	_tagGetRealstreamResp()
	{
		memset(this, 0 ,sizeof(_tagGetRealstreamResp));
	}

}GetRealstreamResp;


typedef struct _tagPutRealStreamReq
{
	int32_t clientHandle;
	int64_t nodeid;
	int32_t camid;
	char tsIp[32];
	int16_t tsCmdPort;
	int16_t tsStreamPort;

	_tagPutRealStreamReq()
	{
		memset(this, 0 ,sizeof(_tagPutRealStreamReq));
	}

}PutRealStreamReq;

typedef struct _tagGetVodstreamReq
{
	char username[16];
	int32_t type;
	int64_t nodeid;
	int32_t camid;
	int16_t startYear;
	int16_t startMonth;
	int16_t startDay;
	int16_t startHour;
	int16_t startMinute;
	int16_t startSecond;
	int16_t endYear;
	int16_t endMonth;
	int16_t endDay;
	int16_t endHour;
	int16_t endMinute;
	int16_t endSecond;

	_tagGetVodstreamReq()
	{
		memset(this, 0 ,sizeof(_tagGetVodstreamReq));
	}
}GetVodstreamReq;

typedef struct _tagGetVodstreamResp
{
	char sessionid[16];
	char tsIp[32];
	int16_t tsCmdPort;
	int16_t tsStreamPort;

	_tagGetVodstreamResp()
	{
		memset(this, 0 ,sizeof(_tagGetVodstreamResp));
	}
}GetVodstreamResp;



typedef struct _tagPingGWReq
{
	int64_t nodeid;
	int32_t nodeType;
	char csIp[32];
	int32_t csPort;
	int32_t cpuusage;
	int32_t bindwidth;
	char publickey[128];
	int32_t onlineNum;
	char version[1024];

	_tagPingGWReq()
	{
		memset(this, 0 ,sizeof(_tagPingGWReq));
	}
}PingGWReq;


typedef struct _tagPutVodstreamReq
{
	int32_t type;
	int32_t clienthandle;
	char tsIp[32];
	int16_t tsCmdPort;
	int16_t tsStreamPort;
	int32_t camid;
	int16_t startYear;
	int16_t startMonth;
	int16_t startDay;
	int16_t startHour;
	int16_t startMinute;
	int16_t startSecond;
	int16_t endYear;
	int16_t endMonth;
	int16_t endDay;
	int16_t endHour;
	int16_t endMinute;
	int16_t endSecond;

	_tagPutVodstreamReq()
	{
		memset(this, 0 ,sizeof(_tagPutVodstreamReq));
	}

}PutVodstreamReq;

typedef struct _tagPutVodstreamResp
{
	char sessionid[16];
	int32_t clienthandle;
	char tsIp[32];
	int16_t tsCmdPort;
	int16_t tsStreamPort;

	_tagPutVodstreamResp()
	{
		memset(this, 0 ,sizeof(_tagPutVodstreamResp));
	}
}PutVodstreamResp;


typedef struct _tagPutRealstreamResp
{
	int32_t clienthandle;
	int64_t nodeid;
	int32_t camid;
	char tsIp[32];
	int16_t tsCmdPort;
	int16_t tsStreamPort;

	_tagPutRealstreamResp()
	{
		memset(this, 0 ,sizeof(_tagPutRealstreamResp));
	}
}PutRealstreamResp;

//#pragma pack(push,4)

typedef struct _tagRealStreamRequest
{
	int32_t client_handle;
	int64_t nodeid;
	int32_t camid;
	char ts_ipaddr[32];
	int16_t ts_cmdport;
	int16_t ts_streamport;
	int16_t streamType; // added by Terry, 2014-04-24

	_tagRealStreamRequest()
	{
		memset(this, 0, sizeof(_tagRealStreamRequest));
	}

}RealStreamRequest, *LPRealStreamRequest;


typedef struct _tagClientPTZControlReq
{
	char username[16];
	int64_t nodeid;
	int32_t camid;
	int8_t cmd;
	int8_t stop;
	int8_t speed;
	int8_t index;

	_tagClientPTZControlReq()
	{
		memset(this, 0, sizeof(_tagClientPTZControlReq));
	}
}ClientPTZControlReq;

typedef struct _tagESPTZControlReq
{
	int32_t camid;
	int8_t cmd;
	int8_t stop;
	int8_t speed;
	int8_t index;

	_tagESPTZControlReq()
	{
		memset(this, 0, sizeof(_tagESPTZControlReq));
	}
}ESPTZControlReq;




typedef struct _tagClientLoginResp
{
	char returncode[16];
	char json[4000];
	int32_t jsontype;
	int32_t Flag; //账号类型

	_tagClientLoginResp()
	{
		memset(this, 0, sizeof(_tagClientLoginResp));
	}
}ClientLoginResp;

typedef struct _tagGetOrganizationReq
{
	int32_t orgnid;
	int32_t orgntype;
	int32_t startindex;
	int32_t limit;

	_tagGetOrganizationReq()
	{
		memset(this, 0, sizeof(_tagGetOrganizationReq));
	}

}GetOrganizationReq;

typedef struct _tagGetOrganizationResp
{
	char json[4000];
	int32_t jsontype;

	_tagGetOrganizationResp()
	{
		memset(this, 0, sizeof(_tagGetOrganizationResp));
	}
}GetOrganizationResp;

typedef struct _tagClientRenameCamReq
{
	char username[16];
	int64_t nodeid;
	int32_t camid;
	char camname[32];

	_tagClientRenameCamReq()
	{
		memset(this, 0, sizeof(_tagClientRenameCamReq));
	}

}ClientRenameCamReq;

typedef struct _tagClientEsStateReq
{
	char username[16];
	int64_t nodeid;
	int32_t startindex;
	int32_t limit;

	_tagClientEsStateReq()
	{
		memset(this, 0, sizeof(_tagClientEsStateReq));
	}
}ClientEsStateReq;

typedef struct _tagClientEsStateResp
{
	char username[16];
	char jsonstr[2048];

	_tagClientEsStateResp()
	{
		memset(this, 0, sizeof(_tagClientEsStateResp));
	}
}ClientEsStateResp;

typedef struct _tagGetMsgaddrResp
{
	char ipaddr[32];
	int16_t port;

	_tagGetMsgaddrResp()
	{
		memset(this, 0, sizeof(_tagGetMsgaddrResp));
	}
}GetMsgaddrResp;

typedef struct _tagESUploadReq
{
	char username[16];
	int64_t nodeid;
	int32_t camid;
	char key[64];  //modify by cathy. 2014-11-10
	char bucketname[64];
	int32_t type;
	int64_t size;
	char starttime[32];
	char endtime[32];

	_tagESUploadReq()
	{
		memset(this, 0, sizeof(_tagESUploadReq));
	}
}ESUploadReq;

typedef struct _tagGetCloudvodstreamReq
{
	char username[16];
	int32_t type;
	int64_t nodeid;
	int32_t camid;
	int32_t vodtype;
	char starttime[32];
	char endtime[32];

	_tagGetCloudvodstreamReq()
	{
		memset(this, 0, sizeof(_tagGetCloudvodstreamReq));
	}
}GetCloudvodstreamReq;

typedef struct _tagGetCloudvodstreamResp
{
	char sessionid[16];
	char rsIP[32];
	int16_t rsstreamport;

	_tagGetCloudvodstreamResp()
	{
		memset(this, 0, sizeof(_tagGetCloudvodstreamResp));
	}
}GetCloudvodstreamResp;

typedef struct _tagDownloadCloudvodstreamReq
{
	char keyJson[1024];
	int32_t clientHandle;
	char rsIP[32];
	int16_t rsstreamport;
	char starttime[32];
	char endtime[32];

	_tagDownloadCloudvodstreamReq()
	{
		memset(this, 0, sizeof(_tagDownloadCloudvodstreamReq));
	}
}DownloadCloudvodstreamReq;


typedef struct _tagDownloadCloudvodstreamResp
{
	char sessionid[16];
	int32_t clientHandle;
	char rsIP[32];
	int16_t rsstreamport;

	_tagDownloadCloudvodstreamResp()
	{
		memset(this, 0, sizeof(_tagDownloadCloudvodstreamResp));
	}

}DownloadCloudvodstreamResp;


typedef struct _tagGetCamInfoReq
{
	char username[16];
	int32_t startindex;
	int32_t limit;
	char camJson[1024];

	_tagGetCamInfoReq()
	{
		memset(this, 0, sizeof(_tagGetCamInfoReq));
	}
}GetCamInfoReq;

typedef struct _tagGetCamInfoResp
{
	char username[16];
	char json[2048];

	_tagGetCamInfoResp()
	{
		memset(this, 0, sizeof(_tagGetCamInfoResp));
	}
}GetCamInfoResp;

typedef struct _tagGetCamPropertyReq
{
	char camJson[1024];

	_tagGetCamPropertyReq()
	{
		memset(this, 0, sizeof(_tagGetCamPropertyReq));
	}
}GetCamPropertyReq;

typedef struct _tagGetCamPropertyResp
{
	char camJson[2048];

	_tagGetCamPropertyResp()
	{
		memset(this, 0, sizeof(_tagGetCamPropertyResp));
	}
}GetCamPropertyResp;


typedef struct _tagClientLoginReq
{
	int32_t nodetype; //0－5：手机类型，0是Android, 1是苹果，后续补充 6：PC桌面客户端 7：Web客户端
	char userid[16];
	char pwd[128];
	int32_t startindex;
	int32_t limit;

	_tagClientLoginReq()
	{
		memset(this, 0, sizeof(_tagClientLoginReq));
	}

}ClientLoginReq;

typedef struct _tagNewClientLoginReq
{
	int64_t nodeid;
	int32_t nodetype; //0－5：手机类型，0是Android, 1是苹果，后续补充 6：PC桌面客户端 7：Web客户端
	char userid[16];
	char pwd[128];
	int32_t startindex;
	int32_t limit;

	_tagNewClientLoginReq()
	{
		memset(this, 0, sizeof(_tagNewClientLoginReq));
	}

}NewClientLoginReq;


typedef struct _tagPersonClientLoginReq
{
	int32_t nodetype;
	char username[32];
	char pwd[128];
	int32_t accountType;
	int64_t nodeid;

	_tagPersonClientLoginReq()
	{
		memset(this, 0, sizeof(_tagPersonClientLoginReq));
	}

}PersonClientLoginReq;




typedef struct _tagPersonClientLoginResp
{
	char returncode[16];
	int32_t falg;
	int32_t userid;
	char IPCInfoJson[4000];

	_tagPersonClientLoginResp()
	{
		memset(this, 0, sizeof(_tagPersonClientLoginResp));
	}

}PersonClientLoginResp;

typedef struct _tagDeleteAlarmMsgReq
{
	int32_t userid;
	int32_t clientType;
	char json[512];

	_tagDeleteAlarmMsgReq()
	{
		memset(this, 0, sizeof(_tagDeleteAlarmMsgReq));
	}
	
}DeleteAlarmMsgReq;

typedef struct _tagSwitchCamReq
{
	int32_t userid;
	int32_t turnoff;
	int64_t nodeid;

	_tagSwitchCamReq()
	{
		memset(this, 0, sizeof(_tagSwitchCamReq));
	}

}SwitchCamReq;

typedef struct _tagFeedbackReq
{
	int32_t userid;
	char time[32];
	char softversion[32];
	char backType[32];
	char content[1024];


	_tagFeedbackReq()
	{
		memset(this, 0, sizeof(_tagFeedbackReq));
	}
}FeedbackReq;

typedef struct _tagPersonRealStreamReq
{
	int32_t userid;
	int64_t nodeid;

	_tagPersonRealStreamReq()
	{
		memset(this, 0, sizeof(_tagPersonRealStreamReq));
	}
}PersonRealStreamReq;

typedef struct _tagPersonRealStreamResp
{
	int64_t nodeid;
	char tsip[32];
	int16_t tscmdPort;
	int16_t tsstreamPort;

	_tagPersonRealStreamResp()
	{
		memset(this, 0, sizeof(_tagPersonRealStreamResp));
	}
}PersonRealStreamResp;


typedef struct _tagIPCIdentifyBindcamReq
{
	int64_t devid;
	int32_t userid;
	char camName[32];

	_tagIPCIdentifyBindcamReq()
	{
		memset(this, 0, sizeof(_tagIPCIdentifyBindcamReq));
	}
}IPCIdentifyBindcamReq;

typedef struct _tagRefreshIpclistResp
{
	char camInfo[4000];

	_tagRefreshIpclistResp()
	{
		memset(this, 0, sizeof(_tagRefreshIpclistResp));
	}
}RefreshIpclistResp;

typedef struct _tagPingReq
{
	int64_t llNodeid;
	int32_t nNodeType;
	int32_t nOnlineNum;
	char szServerIp[32];
	int16_t nServerPort;

	_tagPingReq()
	{
		memset(this, 0, sizeof(_tagPingReq));
	}

}TGPingReq;

typedef struct _tagGetTimeResp
{
	char szTime[32];

	_tagGetTimeResp()
	{
		memset(this, 0, sizeof(_tagGetTimeResp));

	}

}TGGetTimeResp;

typedef struct _tagAuthorizeCamReq
{
	int64_t llNodeid;
	char szCaminfo[512];

	_tagAuthorizeCamReq()
	{
		memset(this, 0, sizeof(_tagAuthorizeCamReq));
	}
}TGAuthorizeCamReq;


typedef struct _tagGetMSGAddrReq
{
	char szUsername[16];

	_tagGetMSGAddrReq()
	{
		memset(this, 0, sizeof(_tagGetMSGAddrReq));
	}

}TGGetMSGAddrReq;


typedef struct _tagGetMSGAddrResp
{
	char szIp[32];
	int16_t nPort;

	_tagGetMSGAddrResp()
	{
		memset(this, 0, sizeof(_tagGetMSGAddrResp));
	}
}TGGetMSGAddrResp;

typedef struct _tagSendAlarmMSGReq
{
	char szUsername[16];
	int32_t nMsgType;
	char szMsgValue[128];

	_tagSendAlarmMSGReq()
	{
		memset(this, 0, sizeof(_tagSendAlarmMSGReq));
	}

}TGSendAlarmMSGReq;


typedef struct _tagGetAlarmMsgReq
{
	char szUsername[16];
	int32_t nIndex;
	int32_t nTotal;
	char szStartTime[32];
	char szEndTime[32];

	_tagGetAlarmMsgReq()
	{
		memset(this, 0, sizeof(_tagGetAlarmMsgReq));
	}
}TGGetAlarmMsgReq;

typedef struct _tagGetAlarmMsgResp
{
	int32_t nTotal;
	char szData[4000];

	_tagGetAlarmMsgResp()
	{
		memset(this, 0, sizeof(_tagGetAlarmMsgResp));
	}
}TGGetAlarmMsgResp;


typedef struct _tagSendAlarmMsgExReq
{
	char szUsername[16];
	int64_t llNodeId;
	int32_t nCamId;
	char szMsgTime[32];
	int32_t nMsgType;
	char szMsgValue[128];

	_tagSendAlarmMsgExReq()
	{
		memset(this, 0, sizeof(_tagSendAlarmMsgExReq));
	}
}TGSendAlarmMsgExReq;

typedef struct _tagSetOnlineNumReq
{
	int32_t userid;
	int32_t onlineNum;

	_tagSetOnlineNumReq()
	{
		memset(this, 0, sizeof(_tagSetOnlineNumReq));
	}
}SetOnlineNumReq;


typedef struct _tagESPingReq
{
	int64_t nodeid;
	int32_t nodeType;
	int16_t cmdPort;
	int16_t streamPort;
	int16_t recPort;
	int16_t cpusage;
	int16_t bindwidth;
	char caminfo[1024];

	_tagESPingReq()
	{
		memset(this, 0, sizeof(_tagESPingReq));
	}
}TGESPINGREQ;

typedef struct _tagClientTalkBackReq
{
	char username[16];
	int64_t nodeid;
	int32_t camid;
	int64_t clientNodeid;

	_tagClientTalkBackReq()
	{
		memset(this, 0, sizeof(_tagClientTalkBackReq));
	}
}TGClientTalkBackReq;

typedef struct _tagClientputTalkbackReq
{
	int64_t nodeid;
	int32_t camid;
	char tsip[32];
	int16_t tsport;

	_tagClientputTalkbackReq()
	{
		memset(this, 0, sizeof(_tagClientputTalkbackReq));
	}
}TGClientputTalkbackReq;

typedef struct _tagClientputTalkbackResp
{
	int64_t nodeId;
	int64_t clientNodeId;
	char tsip[32];
	int16_t tsport;

	_tagClientputTalkbackResp()
	{
		memset(this, 0, sizeof(_tagClientputTalkbackResp));
	}
}TGClientputTalkbackResp;

typedef struct _tagRequestVideoStreamReq
{
	int32_t op;
	char username[16];
	int64_t clientNodeId;
	int64_t ipcNodeId;
	int32_t camId;

	_tagRequestVideoStreamReq()
	{
		memset(this, 0, sizeof(_tagRequestVideoStreamReq));
	}
}TGRequestVideoStreamReq;

typedef struct _tagRequestVideoStreamReqV2 
{
	int32_t op;
	char username[16];
	int64_t clientNodeId;
	int64_t ipcNodeId;
	int32_t camId;
	int32_t clientHandle;

	_tagRequestVideoStreamReqV2()
	{
		memset(this, 0, sizeof(_tagRequestVideoStreamReqV2));
	}
}TGRequestVideoStreamReqV2;

typedef struct _tagGetVSAddrInfo
{
	char username[16];
	int64_t clientNodeId;
	int32_t clientType;

	_tagGetVSAddrInfo()
	{
		memset(this, 0, sizeof(_tagGetVSAddrInfo));
	}
}TGGetVSAddrInfoReq;

typedef struct _tagVSAddrInfoResult
{
	char vsIp[32];
	int32_t vsPort;

	_tagVSAddrInfoResult()
	{
		memset(this, 0, sizeof(_tagVSAddrInfoResult));
	}
}TGVSAddrInfoResult;

typedef struct _tagQueryRecordPeriod
{
	char username[16];
	int64_t clientNodeId;
	int64_t IpcId;
	int32_t camId;
	char jsonStr[128];
	
	_tagQueryRecordPeriod()
	{
		memset(this, 0, sizeof(_tagQueryRecordPeriod));
	}
}TGQueryRecordPeriod;

typedef struct _tagRecordPeriodResult
{
	char jsonStr[2048];

	_tagRecordPeriodResult()
	{
		memset(this, 0, sizeof(_tagRecordPeriodResult));
	}
}TGRecordPeriodResult;

typedef struct _tagClientRemoteCamReq
{
	char username[16];
	int64_t nodeid;
	int32_t camcid;
	_tagClientRemoteCamReq()
	{
		memset(this, 0, sizeof(_tagClientRemoteCamReq));
	}

}ClientRemoteCamReq;

typedef struct _tagClientRemoteCamResp
{
	char username[16];
	int64_t nodeid;
	int32_t camcid;
	char picpath[512];
	_tagClientRemoteCamResp()
	{
		memset(this, 0, sizeof(_tagClientRemoteCamResp));
	}

}ClientRemoteCamResp;




typedef struct _tagClientGetGpsInfoListReq
{
	char username[16];
	_tagClientGetGpsInfoListReq()
	{
		memset(this, 0, sizeof(_tagClientGetGpsInfoListReq));
	}

}ClientGetGpsInfoListReq;

typedef struct _tagClientGetGpsInfoListResp
{
	char username[16];
	char GPSInfo [2048];
	_tagClientGetGpsInfoListResp()
	{
		memset(this, 0, sizeof(_tagClientGetGpsInfoListResp));
	}

}ClientGetGpsInfoListResp;


typedef struct _tagClientGetEsGpsInfoReq
{
	char username[16];
	int64_t nodeid;
	int32_t Starttime;
	int32_t endtime;
	_tagClientGetEsGpsInfoReq()
	{
		memset(this, 0, sizeof(_tagClientGetEsGpsInfoReq));
	}

}ClientGetEsGpsInfoReq;

typedef struct _tagClientGetEsGpsInfoResp
{
	char username[16];
	char GPSInfo [2048];
	_tagClientGetEsGpsInfoResp()
	{
		memset(this, 0, sizeof(_tagClientGetEsGpsInfoResp));
	}

}ClientGetEsGpsInfoResp;


typedef struct _tagClientGetCsNotify
{
	char username[16];
	int64_t nodeid;
	int32_t camcid;
	int32_t nType;
	char picpath[512];
	_tagClientGetCsNotify()
	{
		memset(this, 0, sizeof(_tagClientGetCsNotify));
	}

}ClientGetCsNotify;


typedef struct _tagCsConnectNotify
{
	 int32_t nConnectStates;
	
	_tagCsConnectNotify()
	{
		memset(this, 0, sizeof(_tagCsConnectNotify));
	}

}CsConnectNotify;


typedef struct _tagGPSUploadReq
{
	char username[16];
	int64_t nodeid;
	double longitude;
	double latitude;

	_tagGPSUploadReq()
	{
		memset(this, 0, sizeof(_tagGPSUploadReq));
	}
}GPSUploadReq;

typedef struct _tagGPSUploadResp
{
	char username[16];
	int64_t nodeid;

	_tagGPSUploadResp()
	{
		memset(this, 0, sizeof(_tagGPSUploadResp));
	}
}GPSUploadResp;

typedef struct _tagCapturepicReq
{
	char username[16];
	int32_t clientHandle;
	int32_t camid;

	_tagCapturepicReq()
	{
		memset(this, 0, sizeof(_tagCapturepicReq));
	}
}CapturepicReq;

typedef struct _tagCapturepicResp
{
	char username[16];
	int32_t clientHandle;
	int32_t camid;
	char picpath[512];

	_tagCapturepicResp()
	{
		memset(this, 0, sizeof(_tagCapturepicResp));
	}

}CapturepicResp;

typedef struct _tagESCSUploadfileReq
{
	char username[16];
	int64_t nodeid;
	int32_t camid;
	int32_t type;
	char picpath[512];

	_tagESCSUploadfileReq()
	{
		memset(this, 0, sizeof(_tagESCSUploadfileReq));
	}

}ESCSUploadfileReq;








#pragma pack(pop)

#endif