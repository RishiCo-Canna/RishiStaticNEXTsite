"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_components_CmsComponent_js";
exports.ids = ["src_components_CmsComponent_js"];
exports.modules = {

/***/ "./src/components/CmsComponent.js":
/*!****************************************!*\
  !*** ./src/components/CmsComponent.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var decap_cms_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! decap-cms-app */ \"decap-cms-app\");\n/* harmony import */ var decap_cms_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(decap_cms_app__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/client */ \"react-dom/client\");\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_client__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n// Override CMS's default createRoot\nwindow.createRoot = react_dom_client__WEBPACK_IMPORTED_MODULE_3__.createRoot;\nconst CmsComponent = ()=>{\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (session?.accessToken) {\n            decap_cms_app__WEBPACK_IMPORTED_MODULE_2___default().init({\n                config: {\n                    load_config_file: false,\n                    backend: {\n                        name: \"github\",\n                        repo: \"your-username/your-repo\",\n                        branch: \"main\",\n                        auth_type: \"pkce\",\n                        base_url: window.location.origin,\n                        auth_endpoint: \"api/auth\"\n                    },\n                    media_folder: \"public/images\",\n                    public_folder: \"/images\",\n                    collections: [\n                        {\n                            name: \"pages\",\n                            label: \"Pages\",\n                            folder: \"content/pages\",\n                            create: true,\n                            fields: [\n                                {\n                                    label: \"Title\",\n                                    name: \"title\",\n                                    widget: \"string\"\n                                },\n                                {\n                                    label: \"Body\",\n                                    name: \"body\",\n                                    widget: \"markdown\"\n                                }\n                            ]\n                        }\n                    ]\n                }\n            });\n        }\n    }, [\n        session\n    ]);\n    return null;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CmsComponent);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9DbXNDb21wb25lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ2tDO0FBQ1c7QUFDYjtBQUNjO0FBRTlDLG9DQUFvQztBQUNwQ0ksT0FBT0QsVUFBVSxHQUFHQSx3REFBVUE7QUFFOUIsTUFBTUUsZUFBZTtJQUNuQixNQUFNLEVBQUVDLE1BQU1DLE9BQU8sRUFBRSxHQUFHTiwyREFBVUE7SUFFcENELGdEQUFTQSxDQUFDO1FBQ1IsSUFBSU8sU0FBU0MsYUFBYTtZQUN4Qk4seURBQVEsQ0FBQztnQkFDUFEsUUFBUTtvQkFDTkMsa0JBQWtCO29CQUNsQkMsU0FBUzt3QkFDUEMsTUFBTTt3QkFDTkMsTUFBTTt3QkFDTkMsUUFBUTt3QkFDUkMsV0FBVzt3QkFDWEMsVUFBVWIsT0FBT2MsUUFBUSxDQUFDQyxNQUFNO3dCQUNoQ0MsZUFBZTtvQkFDakI7b0JBQ0FDLGNBQWM7b0JBQ2RDLGVBQWU7b0JBQ2ZDLGFBQWE7d0JBQ1g7NEJBQ0VWLE1BQU07NEJBQ05XLE9BQU87NEJBQ1BDLFFBQVE7NEJBQ1JDLFFBQVE7NEJBQ1JDLFFBQVE7Z0NBQ047b0NBQUVILE9BQU87b0NBQVNYLE1BQU07b0NBQVNlLFFBQVE7Z0NBQVM7Z0NBQ2xEO29DQUFFSixPQUFPO29DQUFRWCxNQUFNO29DQUFRZSxRQUFRO2dDQUFXOzZCQUNuRDt3QkFDSDtxQkFDRDtnQkFDSDtZQUNGO1FBQ0Y7SUFDRixHQUFHO1FBQUNyQjtLQUFRO0lBRVosT0FBTztBQUNUO0FBRUEsaUVBQWVGLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93b3Jrc3BhY2UvLi9zcmMvY29tcG9uZW50cy9DbXNDb21wb25lbnQuanM/NmE2NyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgvcmVhY3QnO1xuaW1wb3J0IENNUyBmcm9tICdkZWNhcC1jbXMtYXBwJztcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50JztcblxuLy8gT3ZlcnJpZGUgQ01TJ3MgZGVmYXVsdCBjcmVhdGVSb290XG53aW5kb3cuY3JlYXRlUm9vdCA9IGNyZWF0ZVJvb3Q7XG5cbmNvbnN0IENtc0NvbXBvbmVudCA9ICgpID0+IHtcbiAgY29uc3QgeyBkYXRhOiBzZXNzaW9uIH0gPSB1c2VTZXNzaW9uKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2Vzc2lvbj8uYWNjZXNzVG9rZW4pIHtcbiAgICAgIENNUy5pbml0KHtcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgbG9hZF9jb25maWdfZmlsZTogZmFsc2UsXG4gICAgICAgICAgYmFja2VuZDoge1xuICAgICAgICAgICAgbmFtZTogJ2dpdGh1YicsXG4gICAgICAgICAgICByZXBvOiAneW91ci11c2VybmFtZS95b3VyLXJlcG8nLCAvLyBSZXBsYWNlIHdpdGggeW91ciBHaXRIdWIgdXNlcm5hbWUvcmVwb1xuICAgICAgICAgICAgYnJhbmNoOiAnbWFpbicsXG4gICAgICAgICAgICBhdXRoX3R5cGU6ICdwa2NlJyxcbiAgICAgICAgICAgIGJhc2VfdXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgICAgICAgYXV0aF9lbmRwb2ludDogJ2FwaS9hdXRoJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbWVkaWFfZm9sZGVyOiAncHVibGljL2ltYWdlcycsXG4gICAgICAgICAgcHVibGljX2ZvbGRlcjogJy9pbWFnZXMnLFxuICAgICAgICAgIGNvbGxlY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdwYWdlcycsXG4gICAgICAgICAgICAgIGxhYmVsOiAnUGFnZXMnLFxuICAgICAgICAgICAgICBmb2xkZXI6ICdjb250ZW50L3BhZ2VzJyxcbiAgICAgICAgICAgICAgY3JlYXRlOiB0cnVlLFxuICAgICAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVGl0bGUnLCBuYW1lOiAndGl0bGUnLCB3aWRnZXQ6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0JvZHknLCBuYW1lOiAnYm9keScsIHdpZGdldDogJ21hcmtkb3duJyB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW3Nlc3Npb25dKTtcblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENtc0NvbXBvbmVudDtcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTZXNzaW9uIiwiQ01TIiwiY3JlYXRlUm9vdCIsIndpbmRvdyIsIkNtc0NvbXBvbmVudCIsImRhdGEiLCJzZXNzaW9uIiwiYWNjZXNzVG9rZW4iLCJpbml0IiwiY29uZmlnIiwibG9hZF9jb25maWdfZmlsZSIsImJhY2tlbmQiLCJuYW1lIiwicmVwbyIsImJyYW5jaCIsImF1dGhfdHlwZSIsImJhc2VfdXJsIiwibG9jYXRpb24iLCJvcmlnaW4iLCJhdXRoX2VuZHBvaW50IiwibWVkaWFfZm9sZGVyIiwicHVibGljX2ZvbGRlciIsImNvbGxlY3Rpb25zIiwibGFiZWwiLCJmb2xkZXIiLCJjcmVhdGUiLCJmaWVsZHMiLCJ3aWRnZXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/CmsComponent.js\n");

/***/ })

};
;