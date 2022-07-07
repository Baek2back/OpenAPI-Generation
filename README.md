# OpenAPI Generation

동일한 OpenAPI Specification(OAS) 문서에 대해 다양한 OpenAPI Generator를 사용해 생성된 결과를 아카이빙합니다.

## OpenAPI Generator - `typescript-axios`

### 사용방법

```shell
# OpenJDK를 필요로 하므로 먼저 설치해준다.
$ brew tap AdoptOpenJDK/openjdk
$ brew install --cask adoptopenjdk12
  export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-12.0.2.jdk/Contents/Home/

$ yarn add -D @openapitools/openapi-generator-cli
```

```shell
# CLI를 통해 실행하는 방법
$ openapi-generator-cli generate -g typescript-axios \
                                 -i {path}/petstore.yaml \
                                 -o {path}/output \
                                 -c {path}/openapitools.json \
                                 -t {path}/templates \
                                 --additional-properties=__,__

# openapitools.json을 사용하는 방법
{
  "$schema": "./node_modules/@openapitools/openapi-generator-cli/config.schema.json",
  "spaces": 2,
  "generator-cli": {
    "version": "6.0.1",
    "generators": {
      "v1.0": {
        "generatorName": "typescript-axios",
        "output": "generated",
        "inputSpec": "http://localhost:5000/api-docs-json",
        "additionalProperties": {
          "supportsES6": "true",
          "withInterfaces": true,
          "useSingleRequestParameter": true,
          "withSeparateModelsAndApi": true,
          "modelPackage": "models",
          "apiPackage": "api"
        }
      }
    }
  }
}
```

- `-g`: generator를 설정하는 옵션
- `-i`: 대상 yaml 혹은 json 파일의 위치
- `-o`: 생성될 파일 위치
- `-c`: generator 설정 config 파일
- `-t`: custom template 설정 파일 경로
- `—additional-properties`: 추가적인 옵션으로 쉼표 사이에 공백이 존재하면 안된다.
    - `enumNameSuffix`: enum의 뒤에 붙을 이름으로 기본값은 Enum이다.
    - `enumPropertyNaming`: enum의 프로퍼티 명 컨벤션으로 기본은 `PascalCase`이며 `camelCase`, `snake_case`, `UPPERCASE`, `original` 모두 가능하다.
    - `useSingleParameter`: 하나의 파라미터마다 인수를 만드는 대신 모든 파라미터를 포함하는 단일 인수로 함수를 생성한다. 기본값은 `false`다.
    - `withSeparateModelsAndApi`: `model`과 `api` 폴더를 분리하여 생성하며 기본값은 `false`다.

### 장점

- Swagger에서 공식적으로 제공하는 도구이므로 신뢰도가 높고 자료가 가장 많다.

### 단점

- OAS Generator가 동작하는 workflow에는 코드 생성에 대한 템플릿과 변환 로직([transforming logic](https://github.com/openapitools/openapi-generator/tree/master/modules/openapi-generator/src/main/java/org/openapitools/codegen/languages))이 존재하므로 자바 코드를 동작시키기 위해 자바 런타임을 필요로 한다.
- 생성되는 코드를 커스텀하기 위해서는 템플릿으로 사용되는 Mustache에 대한 이해를 필요로 한다.

## `openapi-typescript-codegen`

### 사용방법

```shell
$ yarn add -D openapi-typescript-codegen

$ openapi -i https://petstore.swagger.io/v2/swagger.json
                  -o src/api \
                  -c axios \
                  --useOptions \
                  --useUnionTypes

-V: 출력될 버전 번호
-i: OpenAPI specification의 위치로 파일 경로, url이 될 수 있다 (required)
-o: 출력될 디렉토리 (required)
-c: HTTP 클라이언트 종류 [fetch, xhr, node, axios, angular] (default: fetch)

--name <value>: 커스텀 클라이언트 클래스명
--useOptions: arguments 대신 options를 사용한다.
--useUnionTypes: enums 대신 union types를 사용한다.
```

```typescript
// Argument style
const createUser = (
  name: string,
  password: string,
  type?: string,
  address?: string
) => {
  // ...
};

createUser("Jack", "123456", undefined, "NY US");

// Options style
const createUser = ({
  name,
  password,
  type,
  address
}: {
  name: string;
  password: string;
  type?: string;
  address?: string;
}) => {
  // ...
};

createUser({
  name: "Jack",
  password: "123456",
  address: "NY US"
});
```

### 장점

- 자바 런타임이 필요없다.
- 생성되는 코드가 잘 분리되어 있다.

### 단점

- 버전이 0점대라 유지보수 혹은 버전 업그레이드에 따른 코드 베이스 변경 우려
- CancelablePromise라는 커스텀 타입을 사용하므로 기존 타입을 모두 수정하거나 커스텀할 수 있는 방법을 찾아야 함.

## `openapi-typescript`

### 사용방법

```shell
$ yarn add -D openapi-typescript

$ npx openapi-typescript https://petstore.swagger.io/v2/swagger.json \
                         --output schema.ts
```

### 장점
- 자바 런타임이 필요 없다.
- 타입만 제공하고 실제 구현체는 제공하지 않으므로 기존 구현에 연동해야 하거나 커스텀이 용이하다.
- 생성되는 파일의 크기가 가장 작다.
- 구현체가 가장 작아 분석이 용이하다.

### 단점

실제 요청을 보내는 코드는 만들어주지 않으므로 사용할 타입이나 요청 함수를 추가적으로 작업해주어야 하므로 코드 생성의 이점을 누리지 못할 수 있다.

```typescript
import { components, operations } from "./generated-schema.ts";

type APIResponse = components["schemas"]["APIResponse"];

type getUsersById = operations["getUsersById"]

const response = <K extends keyof showPetById['responses']>(
  statusCode: K,
  body: showPetById['responses'][K]['content']['application/json']
) => {};
```

### 단점


## `@rtk-query/codegen-openapi`

- RTK Query 측에서 제공하는 Generator로 코드 생성이 가능함을 확인하기 위한 용도로 아카이빙