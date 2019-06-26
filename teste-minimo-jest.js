const fs = require('fs-extra');
const AWS = require('aws-sdk');

describe('Teste exemplo Jest', () => {
  let s3;

  beforeAll(async () => {
    AWS.config.loadFromPath('./aws.sqs');
    s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  });

  test('Teste upload para bucket apos recebimento', async () => {
    fs.copySync('/diretorio/atual/arquivo.txt', '/destino/arquivo.txt')
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);

    const { Contents: virginia } = await s3
      .listObjects({ Bucket: 's3-virginia' })
      .promise();
    const { Contents: sp } = await s3
      .listObjects({ Bucket: 's3-sp' })
      .promise();

    expect(virginia.length)
      .toEqual(1, 'Arquivo nao foi enviado para o bucket de virgina')
    expect(sp.length)
      .toEquall(1, 'Arquivo nao foi enviado para o bucket de virgina');
  }, 2000);
});
