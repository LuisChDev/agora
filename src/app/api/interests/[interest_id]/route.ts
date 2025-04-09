import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

  region: process.env.AWS_REGION,
});


export const GET = async (
  request: NextRequest,
  { params }: { params: { interest_id: string } }
) => {
  const parameters = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `interests/cards/${params.interest_id}.png`,
    Expires: 60,
  };

  try {
    const url = await getSignedUrl(s3, new GetObjectCommand(parameters), {
      expiresIn: 60,
    });
    return NextResponse.json({ url });
  } catch (error) {
    console.error('S3 getSignedUrl Error: ', error);
    return NextResponse.json({ error }, { status: 500 });
  }
};


// import { NextRequest, NextResponse } from 'next/server';
// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });


// export const GET = async (
//   request: NextRequest,
//   { params }: { params: { interest_id: string } }
// ) => {
//   const parameters = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `interests/cards/${params.interest_id}.png`,
//     Expires: 60,
//   };

//   try {
//     const url = await s3.getSignedUrlPromise('getObject', parameters);
//     return NextResponse.json({ url });
//   } catch (error) {
//     console.error('S3 getSignedUrl Error: ', error);
//     return NextResponse.json({ error }, {status: 500 });
//   }
// };
