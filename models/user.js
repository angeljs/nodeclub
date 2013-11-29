var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config').config;

var UserSchema = new Schema({
    name: { type: String, index: true },
    loginname: { type: String, unique: true },
    pass: { type: String },                 // 密码
    email: { type: String, unique: true },  // 邮箱
    url: { type: String },                  // 个人网站
    profile_image_url: {type: String},      // 头像URL
    location: { type: String },             // 所在地点
    signature: { type: String },            // 个性签名
    profile: { type: String },              // 个人简介
    weibo: { type: String },                // 微博地址
    avatar: { type: String },

    score: { type: Number, default: 0 },                // 积分
    topic_count: { type: Number, default: 0 },          // 发布的话题个数，每发布一个话题，积分 +5
    reply_count: { type: Number, default: 0 },          // 回复的话题个数，每回复一个话题，积分 +5
    follower_count: { type: Number, default: 0 },       // 粉丝个数
    following_count: { type: Number, default: 0 },      // 关注个数
    collect_tag_count: { type: Number, default: 0 },    // 标签收藏
    collect_topic_count: { type: Number, default: 0 },  // 话题收藏
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    is_star: { type: Boolean },
    level: { type: String },
    active: { type: Boolean, default: true },           // 帐号是否激活

    receive_reply_mail: {type: Boolean, default: false },   // 邮件提醒：我的话题收到回复时
    receive_at_mail: { type: Boolean, default: false },     // 邮件提醒：我被别人@时
    from_wp: { type: Boolean },

    retrieve_time : {type: Number},
    retrieve_key : {type: String}
});

UserSchema.virtual('avatar_url').get(function () {
  var url = this.profile_image_url || this.avatar || config.site_static_host + '/public/images/user_icon&48.png';
  return url.replace('http://www.gravatar.com/', 'http://gravatar.qiniudn.com/');
});

mongoose.model('User', UserSchema);
