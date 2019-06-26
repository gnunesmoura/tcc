const fs = require('fs-extra');
const gustAPI = require('gustAPI');

const bucketS3 = gustAPI.s3ServiceBuilder()
  .withConfigFile('./aws.sqs')
  .withBucket('teste-envio-arquivo')
  .build();

beforeEach(async () => bucketS3.cleanBucket());

describe('Teste exemplo Jest + GustAPI', () => {
  test('Teste upload para bucket apos recebimento', async () => {
    fs.copySync('/diretorio/atual/arquivo.txt', '/destino/arquivo.txt');
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);

    const bucketFiles = await bucketS3.getFiles();

    expect(bucketFiles.length)
      .toEqual(1, 'Arquivo nao foi enviado para o bucket de backup primario');
  }, 2000);
});
