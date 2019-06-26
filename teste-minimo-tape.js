const tape = require('tape');
const tapePromise = require('tape-promise').default;
const fs = require('fs-extra');
const AWS = require('aws-sdk');

const test = tapePromise(tape);
let s3;

test('before', () => {
  AWS.config.loadFromPath('./aws.sqs');
  s3 = new AWS.S3({ apiVersion: '2006-03-01' });
})

test('Teste upload para bucket apos recebimento', async (expect) => {
  fs.copySync('/diretorio/atual/arquivo.txt', '/destino/arquivo.txt')

  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);

  const { Contents: virginia } = await s3
    .listObjects({ Bucket: 's3-virginia' })
    .promise();
  const { Contents: sp } = await s3
    .listObjects({ Bucket: 's3-sp' })
    .promise();


  expect.equal(virginia.length, 1, 'Arquivo nao foi enviado para o bucket de virgina');
  expect.equal(sp.length, 1, 'Arquivo nao foi enviado para o bucket de sp');
});
