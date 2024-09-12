import * as cdk from 'aws-cdk-lib';
// import lambda = require('@aws-cdk/aws-lambda');
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import apigw = require('@aws-cdk/aws-apigateway');
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkGithubActionsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkGithubActionsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const lambdaEnvTest: string = this.node.tryGetContext('lambdaEnvTest')!;

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      // runtime: lambda.Runtime.NODEJS_10_X,      // execution environment
      runtime: lambda.Runtime.NODEJS_18_X,      // execution environment
      // code: lambda.Code.asset('src/'),  // code loaded from the "lambda" directory
      code: lambda.Code.fromAsset('src/'), // code loaded from "lambda" directory
      handler: 'lambda/hello.handler',                // file is "hello", function is "handler"
      environment: {
        TEST: lambdaEnvTest
      }
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello,
      endpointTypes: [ apigw.EndpointType.REGIONAL ],
    });
  }
}
