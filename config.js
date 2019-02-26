const config = {
  "ownerID": "",
  "admins": [],
  "support": [],

  "token": "",

  "defaultSettings" : {
    "prefix": "+",
    "modLogChannel": "mod-log",
    "partnerLogChannel": "partner-log",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "pmRole": "Partner Manager",
    "systemNotice": "true",
    "welcomeChannel": "welcome",
    "welcomeMessage": "As it was prohetised, {{user}} joined us! ",
    "welcomeEnabled": "false"
  },

  permLevels: [
    { level: 0,
      name: "User",
      check: () => true
    },

    { level: 1,
      name: "Partner Manager",
      check: (message) => {
        try {
          const pmRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.pmRole.toLowerCase());
          if (pmRole && message.member.roles.has(pmRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator",
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { level: 4,
      name: "Server Owner",
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },

    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owner",
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
