import { DataAPIClient, DEFAULT_KEYSPACE } from "@datastax/astra-db-ts";

const client = new DataAPIClient("AstraCS:PiSHZgLOOpnZouXXPaZwGtXB:934c3d39ec50839b60b4baacbd35b852d805452386c974fb8de2df1e3389dbee")

const db1 = client.db('f207942a-377f-41a0-bc96-1828e4950709', DEFAULT_KEYSPACE);

(async function () {
    const coll = await db1.createCollection('movies');
  
    const admin1 = client.admin();
    const admin2 = client.admin({ adminToken: 'STRONGER_TOKEN' });
  
    console.log(await coll.insertOne({ name: 'Airplane!' }));
    console.log(await admin1.listDatabases());
  })();