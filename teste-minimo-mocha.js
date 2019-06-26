require('dotenv').config();
const fs = require('fs-extra');
const AWS = require('aws-sdk');
const { expect } = require('chai');

describe('Teste exemplo Mocha', () => {
  let s3;

  before(async () => {
    AWS.config.loadFromPath('./aws.sqs');
    s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  });

  it('Teste upload para bucket apos recebimento', async () => {
    fs.copySync('/diretorio/atual/arquivo.txt', '/destino/arquivo.txt')
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);

    const { Contents: virginia } = await s3
      .listObjects({ Bucket: 's3-virginia' })
      .promise();
    const { Contents: sp } = await s3
      .listObjects({ Bucket: 's3-sp' })
      .promise();

    expect(virginia.length)
      .to.be.equal(1, 'Arquivo nao foi enviado para o bucket de virgina')
    expect(sp.length)
      .to.be.equal(1, 'Arquivo nao foi enviado para o bucket de virgina');
  }).timeout(2000);
});
