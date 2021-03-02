import IPFS from "ipfs";

export const makeHash = async (data) => {
  try {
    const node = await IPFS.create();
    const results = await node.add(JSON.stringify(data));
    return {
      status: true,
      hash: results.cid.toString(),
    };
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
