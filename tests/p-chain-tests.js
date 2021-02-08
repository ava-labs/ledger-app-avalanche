fujiAssetId = [
  0x3d, 0x9b, 0xda, 0xc0, 0xed, 0x1d, 0x76, 0x13,
  0x30, 0xcf, 0x68, 0x0e, 0xfd, 0xeb, 0x1a, 0x42,
  0x15, 0x9e, 0xb3, 0x87, 0xd6, 0xd2, 0x95, 0x0c,
  0x96, 0xf7, 0xd2, 0x8f, 0x61, 0xbb, 0xe2, 0xaa,
];
localAssetId = [
  0xdb, 0xcf, 0x89, 0x0f, 0x77, 0xf4, 0x9b, 0x96,
  0x85, 0x76, 0x48, 0xb7, 0x2b, 0x77, 0xf9, 0xf8,
  0x29, 0x37, 0xf2, 0x8a, 0x68, 0x70, 0x4a, 0xf0,
  0x5d, 0xa0, 0xdc, 0x12, 0xba, 0x53, 0xf2, 0xdb,
];

describe("P-chain import and export tests", () => {
  it('can sign a P-chain import transaction', async function () {
    const txn = Buffer.from([
      // CodecID
      0x00, 0x00,
      // base tx:
      0x00, 0x00, 0x00, 0x11,
      0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,

      ... fujiAssetId,

      0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x12, 0x30,
      0x9c, 0xd5, 0xfd, 0xc0, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x01, 0x3c, 0xb7, 0xd3, 0x84,
      0x2e, 0x8c, 0xee, 0x6a, 0x0e, 0xbd, 0x09, 0xf1,
      0xfe, 0x88, 0x4f, 0x68, 0x61, 0xe1, 0xb2, 0x9c,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // sourceChain
      // chain for fuji
      0xab, 0x68, 0xeb, 0x1e, 0xe1, 0x42, 0xa0, 0x5c,
      0xfe, 0x76, 0x8c, 0x36, 0xe1, 0x1f, 0x0b, 0x59,
      0x6d, 0xb5, 0xa3, 0xc6, 0xc7, 0x7a, 0xab, 0xe6,
      0x65, 0xda, 0xd9, 0xe6, 0x38, 0xca, 0x94, 0xf7,
      // input count:
      0x00, 0x00, 0x00, 0x01,
      // txID:
      0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
      0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
      0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
      0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
      // utxoIndex:
      0x00, 0x00, 0x00, 0x05,
      // assetID:
      ... fujiAssetId,

      // input:
      0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x20, 0x00,
      0xee, 0x6b, 0x28, 0x00, 0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00,
    ]);
    const pathPrefix = "44'/9000'/0'";
    const pathSuffixes = ["0/0", "0/1", "100/100"];
    const ui = await flowMultiPrompt(this.speculos, [
      [{header:"Sign",body:"Import"}],
      [{header:"From X chain",body:"19999.999 to fuji18jma8ppw3nhx5r4ap8clazz0dps7rv5u6wmu4t"}],
      [{header:"Fee",body:"15188.373088832"}],
      [{header:"Finalize",body:"Transaction"}],
    ]);
    const sigPromise = this.ava.signTransaction(
      BIPPath.fromString(pathPrefix),
      pathSuffixes.map(x => BIPPath.fromString(x, false)),
      txn,
    );
    await sigPromise;
    await ui.promptsPromise;
  });

  it('can sign a P-chain export transaction', async function () {
    const txn = Buffer.from([
      0x00, 0x00,
      // base tx:
      0x00, 0x00, 0x00, 0x12,
      0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
      ... fujiAssetId,
      0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x01,
      0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
      0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
      0x43, 0xab, 0x08, 0x59, 0x00, 0x00, 0x00, 0x01,
      0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
      0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
      0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
      0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
      0x00, 0x00, 0x00, 0x05,
      ... fujiAssetId,
      0x00, 0x00, 0x00, 0x05,
      0x00, 0x00, 0x00, 0x00, 0x07, 0x5b, 0xcd, 0x15,
      0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x07,
      0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04,
      0x00, 0x01, 0x02, 0x03,
      // destination_chain:
      // use fuji, not p-chain.
      0xab, 0x68, 0xeb, 0x1e, 0xe1, 0x42, 0xa0, 0x5c,
      0xfe, 0x76, 0x8c, 0x36, 0xe1, 0x1f, 0x0b, 0x59,
      0x6d, 0xb5, 0xa3, 0xc6, 0xc7, 0x7a, 0xab, 0xe6,
      0x65, 0xda, 0xd9, 0xe6, 0x38, 0xca, 0x94, 0xf7,
      // outs[] count:
      0x00, 0x00, 0x00, 0x01,
      // assetID:
      ... fujiAssetId,
      // output:
      0x00, 0x00, 0x00, 0x07,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x51, 0x02, 0x5c, 0x61, 0xfb, 0xcf, 0xc0, 0x78,
      0xf6, 0x93, 0x34, 0xf8, 0x34, 0xbe, 0x6d, 0xd2,
      0x6d, 0x55, 0xa9, 0x55,
    ]);
    const pathPrefix = "44'/9000'/0'";
    const pathSuffixes = ["0/0", "0/1", "100/100"];
    const ui = await flowMultiPrompt(this.speculos, [
      [{header:"Sign",body:"Export"}],
      [{header:"Transfer",body:'0.000012345 to fuji1cv6yz28qvqfgah34yw3y53su39p6kzzehw5pj3'}],
      [{header:"P to X chain",body:'0.000012345 to fuji12yp9cc0melq83a5nxnurf0nd6fk4t224unmnwx'}],
      [{header:"Fee",body:"0.123432099"}],
      [{header:"Finalize",body:"Transaction"}],
    ]);
    const sigPromise = this.ava.signTransaction(
      BIPPath.fromString(pathPrefix),
      pathSuffixes.map(x => BIPPath.fromString(x, false)),
      txn,
    );
    await sigPromise;
    await ui.promptsPromise;
  });
});
describe('Staking tests', async function () {
  it('can sign an add validator transaction', async function () {
    const txn = Buffer.from([
      0x00, 0x00,
      0x00, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x30, 0x39,
      // blockchain ID
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // number of outputs
      0x00, 0x00, 0x00, 0x01,
      // output
      ... localAssetId,
      0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
      0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
      0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
      0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
      // number of inputs
      0x00, 0x00, 0x00, 0x01,
      // input
      0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
      0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
      0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
      0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
      // addresses?
      0x00, 0x00, 0x00, 0x01,

      ... localAssetId,

      0x00, 0x00, 0x00, 0x05,

      // Have to tweak this up from the serialization reference, because we need
      // enough to stake.
      // 0x00, 0x00, 0x00, 0x00, 0xee, 0x6b, 0x28, 0x00,
      0x00, 0x00, 0x01, 0xd2, 0x97, 0xb5, 0x48, 0x00,
      0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00,
      // memo length
      0x00, 0x00, 0x00, 0x00,
      // Node ID
      0xe9, 0x09, 0x4f, 0x73, 0x69, 0x80, 0x02, 0xfd,
      0x52, 0xc9, 0x08, 0x19, 0xb4, 0x57, 0xb9, 0xfb,
      0xc8, 0x66, 0xab, 0x80,
      // StartTime
      0x00, 0x00, 0x00, 0x00, 0x5f, 0x21, 0xf3, 0x1d,
      // EndTime
      0x00, 0x00, 0x00, 0x00, 0x5f, 0x49, 0x7d, 0xc6,
      // Weight
      0x00, 0x00, 0x01, 0xd1, 0xa9, 0x4a, 0x20, 0x00,
      // Stake
      0x00, 0x00, 0x00, 0x01,
      // Stake asset
      ... localAssetId,
      0x00, 0x00, 0x00, 0x07,
      0x00, 0x00, 0x01, 0xd1, 0xa9, 0x4a, 0x20, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x3c, 0xb7, 0xd3, 0x84, 0x2e, 0x8c, 0xee, 0x6a,
      0x0e, 0xbd, 0x09, 0xf1, 0xfe, 0x88, 0x4f, 0x68,
      0x61, 0xe1, 0xb2, 0x9c,
      // RewardsOwner
      0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
      0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
      0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
      // Shares
      0x00, 0x00, 0x00, 0x64]);

    const pathPrefix = "44'/9000'/0'";
    const pathSuffixes = ["0/0", "0/1", "100/100"];
    const ui = await flowMultiPrompt(this.speculos, [
      [{header: 'Sign', body: 'Add Validator'}],
      [{header: 'Transfer', body: '3.999 to local1mg47uqd7stkvqrp57ds7m28txra45u2uzkta8n'}],
      [{header: 'Validator', body: 'NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN' }],
      [{header: 'Start time', body: '2020-07-29 22:07:25 UTC' }],
      [{header: 'End time', body: '2020-08-28 21:57:26 UTC' }],
      [{header: 'Total Stake', body: '2000' }],
      [{header: 'Stake',body: '2000 to local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u'}],
      [{header: 'Rewards To', body: 'local1mg47uqd7stkvqrp57ds7m28txra45u2uzkta8n' }],
      [{header: 'Delegation Fee', body: '0.01%' }],
      [{header: 'Fee',body: '0.001'}],
      [{header: 'Finalize',body: 'Transaction'}],
    ]);
    const sigPromise = this.ava.signTransaction(
      BIPPath.fromString(pathPrefix),
      pathSuffixes.map(x => BIPPath.fromString(x, false)),
      txn,
    );
    await sigPromise;
    await ui.promptsPromise;
  });
  it('Rejects an add validator transaction if total stake is not sum of stake UTXOs', async function () {
    try {
      const txn = Buffer.from([
        0x00, 0x00,
        0x00, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x30, 0x39,
        // blockchain ID
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        // number of outputs
        0x00, 0x00, 0x00, 0x01,
        // output
        ... localAssetId,
        0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
        0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
        0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
        0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
        // number of inputs
        0x00, 0x00, 0x00, 0x01,
        // input
        0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
        0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
        0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
        0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
        // addresses?
        0x00, 0x00, 0x00, 0x01,

        ... localAssetId,

        0x00, 0x00, 0x00, 0x05,

        // Have to tweak this up from the serialization reference, because we need
        // enough to stake.
        // 0x00, 0x00, 0x00, 0x00, 0xee, 0x6b, 0x28, 0x00,
        0x00, 0x00, 0x01, 0xd2, 0x97, 0xb5, 0x48, 0x00,
        0x00, 0x00, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x00,
        // memo length
        0x00, 0x00, 0x00, 0x00,
        // Node ID
        0xe9, 0x09, 0x4f, 0x73, 0x69, 0x80, 0x02, 0xfd,
        0x52, 0xc9, 0x08, 0x19, 0xb4, 0x57, 0xb9, 0xfb,
        0xc8, 0x66, 0xab, 0x80,
        // StartTime
        0x00, 0x00, 0x00, 0x00, 0x5f, 0x21, 0xf3, 0x1d,
        // EndTime
        0x00, 0x00, 0x00, 0x00, 0x5f, 0x49, 0x7d, 0xc6,
        // Weight
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
        // Stake
        0x00, 0x00, 0x00, 0x01,
        // Stake asset
        ... localAssetId,
        0x00, 0x00, 0x00, 0x07,
        0x00, 0x00, 0x01, 0xd1, 0xa9, 0x4a, 0x20, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x3c, 0xb7, 0xd3, 0x84, 0x2e, 0x8c, 0xee, 0x6a,
        0x0e, 0xbd, 0x09, 0xf1, 0xfe, 0x88, 0x4f, 0x68,
        0x61, 0xe1, 0xb2, 0x9c,
        // RewardsOwner
        0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
        0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
        0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
        // Shares
        0x00, 0x00, 0x00, 0x64]);

      const pathPrefix = "44'/9000'/0'";
      const pathSuffixes = ["0/0", "0/1", "100/100"];
      const ui = await flowMultiPrompt(this.speculos, [
        [{header: 'Sign', body: 'Add Validator'}],
        [{header: 'Transfer', body: '3.999 to local1mg47uqd7stkvqrp57ds7m28txra45u2uzkta8n'}],
        [{header: 'Validator', body: 'NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN' }],
        [{header: 'Start time', body: '2020-07-29 22:07:25 UTC' }],
        [{header: 'End time', body: '2020-08-28 21:57:26 UTC' }],
        [{header: 'Total Stake', body: '0.000054321' }],
        [{header: 'Stake',body: '2000 to local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u'}],
      ], "Next", "Next");
      const sigPromise = this.ava.signTransaction(
        BIPPath.fromString(pathPrefix),
        pathSuffixes.map(x => BIPPath.fromString(x, false)),
        txn,
      );
      await sigPromise;
      await ui.promptsPromise;
    } catch(e) {
      expect(e).has.property('statusCode', 0x9405);
    }
  });

  it('can sign an add delegator transaction', async function () {
    const txn = Buffer.from([
      0x00, 0x00,
      // base tx:
      0x00, 0x00, 0x00, 0x0e, 0x00, 0x00, 0x30, 0x39,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x01,
      ... localAssetId,
      0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
      0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
      0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
      0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
      0x00, 0x00, 0x00, 0x01,
      0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
      0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
      0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
      0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
      0x00, 0x00, 0x00, 0x01,
      ... localAssetId,
      0x00, 0x00, 0x00, 0x05,

      // Have to override relative to the reference, as this
      // doesn't provide enough funds for stake.
      // 0x00, 0x00, 0x00, 0x00, 0xee, 0x6b, 0x28, 0x00,
      0x00, 0x00, 0x01, 0xd2, 0x97, 0xb5, 0x48, 0x00,
      0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      // Node ID
      0xe9, 0x09, 0x4f, 0x73, 0x69, 0x80, 0x02, 0xfd,
      0x52, 0xc9, 0x08, 0x19, 0xb4, 0x57, 0xb9, 0xfb,
      0xc8, 0x66, 0xab, 0x80,
      // StartTime
      0x00, 0x00, 0x00, 0x00, 0x5f, 0x21, 0xf3, 0x1d,
      // EndTime
      0x00, 0x00, 0x00, 0x00, 0x5f, 0x49, 0x7d, 0xc6,
      // Weight
      0x00, 0x00, 0x01, 0xd1, 0xa9, 0x4a, 0x20, 0x00,
      // Stake
      0x00, 0x00, 0x00, 0x01,
      ... localAssetId,
      0x00, 0x00, 0x00, 0x07,
      0x00, 0x00, 0x01, 0xd1, 0xa9, 0x4a, 0x20, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x3c, 0xb7, 0xd3, 0x84, 0x2e, 0x8c, 0xee, 0x6a,
      0x0e, 0xbd, 0x09, 0xf1, 0xfe, 0x88, 0x4f, 0x68,
      0x61, 0xe1, 0xb2, 0x9c,
      // RewardsOwner
      0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
      0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
      0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
    ]);
    const pathPrefix = "44'/9000'/0'";
    const pathSuffixes = ["0/0", "0/1", "100/100"];
    const ui = await flowMultiPrompt(this.speculos, [
      [{header: 'Sign', body: 'Add Delegator'}],
      [{header: 'Transfer', body: '3.999 to local1mg47uqd7stkvqrp57ds7m28txra45u2uzkta8n'}],
      [{header: 'Validator', body: 'NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN' }],
      [{header: 'Start time', body: '2020-07-29 22:07:25 UTC' }],
      [{header: 'End time', body: '2020-08-28 21:57:26 UTC' }],
      [{header: 'Total Stake', body: '2000' }],
      [{header: 'Stake', body: '2000 to local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u'}],
      [{header: 'Rewards To', body: 'local1mg47uqd7stkvqrp57ds7m28txra45u2uzkta8n' }],
      [{header: 'Fee', body: '0.001'}],
      [{header: 'Finalize', body: 'Transaction'}],
    ]);
    const sigPromise = this.ava.signTransaction(
      BIPPath.fromString(pathPrefix),
      pathSuffixes.map(x => BIPPath.fromString(x, false)),
      txn,
    );
    await sigPromise;
    await ui.promptsPromise;
  });
  it('rejects an add delegator transaction where weight is not sum of stake', async function () {
    try {
      const txn = Buffer.from([
        0x00, 0x00,
        // base tx:
        0x00, 0x00, 0x00, 0x0e, 0x00, 0x00, 0x30, 0x39,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x01,
        ... localAssetId,
        0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
        0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
        0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
        0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
        0x00, 0x00, 0x00, 0x01,
        0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
        0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
        0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
        0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
        0x00, 0x00, 0x00, 0x01,
        ... localAssetId,
        0x00, 0x00, 0x00, 0x05,

        // Have to override relative to the reference, as this
        // doesn't provide enough funds for stake.
        // 0x00, 0x00, 0x00, 0x00, 0xee, 0x6b, 0x28, 0x00,
        0x00, 0x00, 0x01, 0xd2, 0x97, 0xb5, 0x48, 0x00,
        0x00, 0x00, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        // Node ID
        0xe9, 0x09, 0x4f, 0x73, 0x69, 0x80, 0x02, 0xfd,
        0x52, 0xc9, 0x08, 0x19, 0xb4, 0x57, 0xb9, 0xfb,
        0xc8, 0x66, 0xab, 0x80,
        // StartTime
        0x00, 0x00, 0x00, 0x00, 0x5f, 0x21, 0xf3, 0x1d,
        // EndTime
        0x00, 0x00, 0x00, 0x00, 0x5f, 0x49, 0x7d, 0xc6,
        // Weight
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
        // Stake
        0x00, 0x00, 0x00, 0x01,
        ... localAssetId,
        0x00, 0x00, 0x00, 0x07,
        0x00, 0x00, 0x01, 0xd1, 0xa9, 0x4a, 0x20, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x3c, 0xb7, 0xd3, 0x84, 0x2e, 0x8c, 0xee, 0x6a,
        0x0e, 0xbd, 0x09, 0xf1, 0xfe, 0x88, 0x4f, 0x68,
        0x61, 0xe1, 0xb2, 0x9c,
        // RewardsOwner
        0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
        0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
        0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
      ]);
      const pathPrefix = "44'/9000'/0'";
      const pathSuffixes = ["0/0", "0/1", "100/100"];
      const ui = await flowMultiPrompt(this.speculos, [
        [{header: 'Sign', body: 'Add Delegator'}],
        [{header: 'Transfer', body: '3.999 to local1mg47uqd7stkvqrp57ds7m28txra45u2uzkta8n'}],
        [{header: 'Validator', body: 'NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN' }],
        [{header: 'Start time', body: '2020-07-29 22:07:25 UTC' }],
        [{header: 'End time', body: '2020-08-28 21:57:26 UTC' }],
        [{header: 'Total Stake', body: '0.000054321' }],
        [{header: 'Stake', body: '2000 to local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u'}],
      ], "Next", "Next");
      const sigPromise = this.ava.signTransaction(
        BIPPath.fromString(pathPrefix),
        pathSuffixes.map(x => BIPPath.fromString(x, false)),
        txn,
      );
      await sigPromise;
      await ui.promptsPromise;
    } catch(e) {
      expect(e).has.property('statusCode', 0x9405);
    }
  });
});
