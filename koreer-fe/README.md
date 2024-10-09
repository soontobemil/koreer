# Koreer Frontend setup

## Install npm / yarn library

In the project directory, you can run:

````
    1. nvm(Node Version Manager) install 
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
    
    2. node 18.10.1v install
    nvm install 18.10.1
    
    3. Navigate to the current project directory and then install
    cd ../../koreer/koreer-fe
    
    yarn install(recommended) / npm install
    
   
   Mandatory Libraries
   
   yarn add @mui/material @emotion/react @emotion/styled  
   or  npm install @mui/material @emotion/react @emotion/styled
   
   yarn add @types/lodash --dev  (throttle을 사용하기 위함 - 고빈도의 이벤트(예: 스크롤, 리사이즈, 마우스 무브 등)가 발생할 때 이를 제한하여 성능을 최적화하는 기법)
   or npm install @types/lodash --save-dev

    yarn add axios (api 연동 위함)
    yarn add redux react-redux
    npm install axios

    yarn add @reduxjs/toolkit
    
    yarn add react-cookie // jwt
    yarn add jwt-decode // jwt

````

### `yarn start dev / npm run`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


