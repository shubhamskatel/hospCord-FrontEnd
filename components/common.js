import IPFS from "ipfs";
// const IPFS = require("ipfs-core");

export const makeHash = async (data) => {
  try {
    console.log({ data });
    const node = await IPFS.create();

    console.log({ node });
    const buffer = Buffer.from(data);
    const results = await node.add(buffer);

    console.log({ results });
    return {
      status: true,
      hash: results.cid.toString(),
    };

    console.log("4");

    // console.log("1");
    // const node = await IPFS.create();

    // console.log("2");
    // const record = JSON.stringify(data);

    // console.log("3");
    // // const result = await node.add(record);

    // console.log("4");
    // console.log(result);

    // for await (const { cid } of result) {
    //   // CID (Content IDentifier) uniquely addresses the data
    //   // and can be used to get it again.
    //   console.log(cid.toString());
    // }

    // console.log(record);

    // IPFS.files
    //   .add(Buffer.from(record))
    //   .then((res) => {
    //     const hash = res[0].hash;
    //     console.log("added data hash:", hash);
    //     return ipfs.files.cat(hash);
    //   })
    //   .then((output) => {
    //     console.log("retrieved data:", JSON.parse(output));
    //   });

    // const node = await IPFS.create();
    // const results = await node.add(record);
    // console.log(results);

    // const file = await node.add(record, (err, hash) => {
    //   if (err) {
    //     return err;
    //   } else {
    //     console.log(hash);
    //   }
    // });
    //   console.log(file);
    // });

    // const node = await IPFS.create();
    // const results = await IPFS.add(JSON.stringify(data));

    // console.log(results);
    // return {
    //   status: true,
    //   hash: results.cid.toString(),
    // };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
};
export const decHash = async (hash) => {
  try {
    const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
    const data = await response.json();
    return {
      status: true,
      data,
    };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
};
