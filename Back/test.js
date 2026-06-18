const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv(
  "_mongodb._tcp.chatapp.klqr7sc.mongodb.net",
  (err, records) => {
    console.log("Erreur :", err);
    console.log("Records :", records);
  }
);