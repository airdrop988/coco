{
  "name": "callmanagement",
  "version": "0.1.0",
  "private": true,
  "homepage": "/callmanagement",
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "@jpmuitk/logo": "^33.0.0",
    "@jpmuitk/accordion": "^33.0.0",
    "@jpmuitk/app-header": "^33.0.0",
    "@jpmuitk/aria-announcer": "^33.0.0",
    "@jpmuitk/banner": "^33.0.0",
    "@jpmuitk/button": "^33.0.0",
    "@jpmuitk/button-bar": "^33.0.0",
    "@jpmuitk/code-block": "^33.0.0",
    "@jpmuitk/components": "^33.0.0",
    "@jpmuitk/data-grid": "^33.0.0",
    "@jpmuitk/date-picker": "^33.0.0",
    "@jpmuitk/file-drop-zone": "^33.0.0",
    "@jpmuitk/icon": "^33.0.0",
    "@jpmuitk/radio-button": "^33.0.0",
    "@jpmuitk/style": "^33.0.0",
    "@jpmuitk/theme": "^33.0.0",
    "@jpmuitk/toast": "^33.0.0",
    "@jpmuitk/tokenized-input": "^33.0.0",
    "@jpmuitk/toolbar-next": "^33.0.0",
    "@jpmuitk/tooltip": "^33.0.0",
    "@marketsui/blotter": "^30.13.0",
    "@marketsui/blotter-grid": "^30.13.0",
    "@marketsui/common": "^30.13.0",
    "@marketsui/data-client": "^30.13.0",
    "@marketsui/data-client-provider": "^30.13.0",
    "@marketsui/filter-components": "^30.13.0",
    "@marketsui/query-filter": "^30.13.0",
    "@marketsui/query-manager": "^30.13.0",
    "@marketsui/save-restore": "^30.13.0",
    "@marketsui/schema": "^30.13.0",
    "@marketsui/schema-provider": "^30.13.0",
    "@material-ui/core": "^4.11.4",
    "@salt-ds/ag-grid-theme": "2.4.1",
    "@salt-ds/core": "1.47.1",
    "@salt-ds/countries": "1.4.16",
    "@salt-ds/date-adapters": "^0.1.0-alpha.5",
    "@salt-ds/icons": "1.11.2",
    "@salt-ds/lab": "^1.0.0-alpha.71",
    "@salt-ds/theme": "1.30.0",
    "@uiservices/ui-platform-api-salt-react-bindings": "^0.9.1",
    "buffer": "^6.0.3",
    "computed-style-to-inline-style": "^3.0.0",
    "concurrently": "^8.2.2",
    "dompurify": "^3.0.5",
    "graphql": "^16.7.1",
    "lodash": "^4.17.21",
    "moment": "^2.30.1",
    "moment-timezone": "^0.5.43",
    "numeral": "^2.0.6",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-resizable-panels": "^3.0.3",
    "styled-components": "^6.0.5",
    "uuid": "^9.0.0",
    "@emotion/css": "^11.11.2"
  },
  "overrides": {
    "@material-ui/core": {
      "react": "$react",
      "react-dom": "$react-dom",
      "@types/react": "^17.x.x"
    }
  },
  "devDependencies": {
    "@module-federation/node": "^2.7.10",
    "concurrently": "^8.2.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1",
    "fs": "^0.0.2"
  },
  "peerDependencies": {
    "jest-environment-node": "27.5.1",
    "jest-runner": "^27.5.1",
    "react": "17.0.2",
    "react-dom": "17.0.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "start:mf": "webpack serve --open",
    "build": "webpack --mode production",
    "build:original": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
