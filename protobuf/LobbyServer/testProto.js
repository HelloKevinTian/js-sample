var ProtoBuf = require("protobufjs");
var logger = require("ss-logger").getLogger(__filename);

var root = ProtoBuf.loadProtoFile(__dirname + "/proto/message.proto").build();


logger.debug(root);

logger.debug(typeof root.Item);
logger.debug(typeof root.MSG_MODULE_TYPE);

var protoData = new root.Item();
logger.debug(protoData);

var buf = protoData.toBuffer();
logger.debug(buf);



protoData = root.Item.decode(buf);
logger.debug(protoData);