"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["src_components_CmsComponent_js"],{

/***/ "./src/components/CmsComponent.js":
/*!****************************************!*\
  !*** ./src/components/CmsComponent.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CmsComponent; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nfunction CmsComponent() {\n    _s();\n    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (session === null || session === void 0 ? void 0 : session.accessToken) {\n            (async ()=>{\n                try {\n                    console.log(\"Loading Decap CMS...\");\n                    const CMS = (await __webpack_require__.e(/*! import() */ \"node_modules_decap-cms-app_dist_decap-cms-app_js\").then(__webpack_require__.t.bind(__webpack_require__, /*! decap-cms-app */ \"./node_modules/decap-cms-app/dist/decap-cms-app.js\", 23))).default;\n                    await CMS.init({\n                        config: {\n                            load_config_file: false,\n                            backend: {\n                                name: \"github\",\n                                repo: \"RishiCo-Canna/RishiWebsite\",\n                                branch: \"main\",\n                                auth_type: \"oauth\",\n                                base_url: window.location.origin,\n                                auth_endpoint: \"api/auth\",\n                                app_id: \"Ov23liMKn4l1R9rb3onj\",\n                                auth_scope: \"repo,user\"\n                            },\n                            media_folder: \"public/uploads\",\n                            public_folder: \"/uploads\",\n                            collections: [\n                                {\n                                    name: \"pages\",\n                                    label: \"Pages\",\n                                    folder: \"content/pages\",\n                                    create: true,\n                                    fields: [\n                                        {\n                                            label: \"Title\",\n                                            name: \"title\",\n                                            widget: \"string\"\n                                        },\n                                        {\n                                            label: \"Body\",\n                                            name: \"body\",\n                                            widget: \"markdown\"\n                                        }\n                                    ]\n                                },\n                                {\n                                    name: \"products\",\n                                    label: \"Products\",\n                                    folder: \"content/products\",\n                                    create: true,\n                                    fields: [\n                                        {\n                                            label: \"Title\",\n                                            name: \"title\",\n                                            widget: \"string\"\n                                        },\n                                        {\n                                            label: \"Image\",\n                                            name: \"image\",\n                                            widget: \"image\"\n                                        },\n                                        {\n                                            label: \"Description\",\n                                            name: \"description\",\n                                            widget: \"markdown\"\n                                        },\n                                        {\n                                            label: \"Price\",\n                                            name: \"price\",\n                                            widget: \"number\",\n                                            value_type: \"float\"\n                                        }\n                                    ]\n                                }\n                            ],\n                            local_backend: false,\n                            publish_mode: \"editorial_workflow\"\n                        }\n                    });\n                    console.log(\"CMS initialized successfully\");\n                } catch (error) {\n                    console.error(\"Error initializing CMS:\", error);\n                }\n            })();\n        }\n    }, [\n        session\n    ]);\n    if (status === \"loading\") {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            style: {\n                padding: \"20px\",\n                textAlign: \"center\"\n            },\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: \"Loading authentication...\"\n            }, void 0, false, {\n                fileName: \"/home/runner/workspace/src/components/CmsComponent.js\",\n                lineNumber: 68,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/home/runner/workspace/src/components/CmsComponent.js\",\n            lineNumber: 67,\n            columnNumber: 7\n        }, this);\n    }\n    if (!session) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            style: {\n                padding: \"20px\",\n                textAlign: \"center\"\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                    children: \"Admin Access Required\"\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/src/components/CmsComponent.js\",\n                    lineNumber: 76,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: \"Please sign in with GitHub to access the admin panel\"\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/src/components/CmsComponent.js\",\n                    lineNumber: 77,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signIn)(\"github\", {\n                            callbackUrl: \"/admin\"\n                        }),\n                    style: {\n                        background: \"#24292e\",\n                        color: \"white\",\n                        border: \"none\",\n                        padding: \"10px 20px\",\n                        borderRadius: \"5px\",\n                        cursor: \"pointer\",\n                        fontSize: \"16px\"\n                    },\n                    children: \"Sign in with GitHub\"\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/src/components/CmsComponent.js\",\n                    lineNumber: 78,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/runner/workspace/src/components/CmsComponent.js\",\n            lineNumber: 75,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        id: \"nc-root\"\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/src/components/CmsComponent.js\",\n        lineNumber: 96,\n        columnNumber: 10\n    }, this);\n}\n_s(CmsComponent, \"SUhGOrYJPrV+CKXhLterHptJmQk=\", false, function() {\n    return [\n        next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession\n    ];\n});\n_c = CmsComponent;\nvar _c;\n$RefreshReg$(_c, \"CmsComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9DbXNDb21wb25lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ21CO0FBRXJDLFNBQVNHOztJQUN0QixNQUFNLEVBQUVDLE1BQU1DLE9BQU8sRUFBRUMsTUFBTSxFQUFFLEdBQUdMLDJEQUFVQTtJQUU1Q0QsZ0RBQVNBLENBQUM7UUFDUixJQUFJSyxvQkFBQUEsOEJBQUFBLFFBQVNFLFdBQVcsRUFBRTtZQUN2QjtnQkFDQyxJQUFJO29CQUNGQyxRQUFRQyxHQUFHLENBQUM7b0JBQ1osTUFBTUMsTUFBTSxDQUFDLE1BQU0sOE5BQXNCLEVBQUdDLE9BQU87b0JBRW5ELE1BQU1ELElBQUlFLElBQUksQ0FBQzt3QkFDYkMsUUFBUTs0QkFDTkMsa0JBQWtCOzRCQUNsQkMsU0FBUztnQ0FDUEMsTUFBTTtnQ0FDTkMsTUFBTUMsNEJBQTZDO2dDQUNuREcsUUFBUTtnQ0FDUkMsV0FBVztnQ0FDWEMsVUFBVUMsT0FBT0MsUUFBUSxDQUFDQyxNQUFNO2dDQUNoQ0MsZUFBZTtnQ0FDZkMsUUFBUVYsc0JBQXVDO2dDQUMvQ1ksWUFBWTs0QkFDZDs0QkFDQUMsY0FBYzs0QkFDZEMsZUFBZTs0QkFDZkMsYUFBYTtnQ0FDWDtvQ0FDRWpCLE1BQU07b0NBQ05rQixPQUFPO29DQUNQQyxRQUFRO29DQUNSQyxRQUFRO29DQUNSQyxRQUFRO3dDQUNOOzRDQUFFSCxPQUFPOzRDQUFTbEIsTUFBTTs0Q0FBU3NCLFFBQVE7d0NBQVM7d0NBQ2xEOzRDQUFFSixPQUFPOzRDQUFRbEIsTUFBTTs0Q0FBUXNCLFFBQVE7d0NBQVc7cUNBQ25EO2dDQUNIO2dDQUNBO29DQUNFdEIsTUFBTTtvQ0FDTmtCLE9BQU87b0NBQ1BDLFFBQVE7b0NBQ1JDLFFBQVE7b0NBQ1JDLFFBQVE7d0NBQ047NENBQUVILE9BQU87NENBQVNsQixNQUFNOzRDQUFTc0IsUUFBUTt3Q0FBUzt3Q0FDbEQ7NENBQUVKLE9BQU87NENBQVNsQixNQUFNOzRDQUFTc0IsUUFBUTt3Q0FBUTt3Q0FDakQ7NENBQUVKLE9BQU87NENBQWVsQixNQUFNOzRDQUFlc0IsUUFBUTt3Q0FBVzt3Q0FDaEU7NENBQUVKLE9BQU87NENBQVNsQixNQUFNOzRDQUFTc0IsUUFBUTs0Q0FBVUMsWUFBWTt3Q0FBUTtxQ0FDeEU7Z0NBQ0g7NkJBQ0Q7NEJBQ0RDLGVBQWU7NEJBQ2ZDLGNBQWM7d0JBQ2hCO29CQUNGO29CQUNBakMsUUFBUUMsR0FBRyxDQUFDO2dCQUNkLEVBQUUsT0FBT2lDLE9BQU87b0JBQ2RsQyxRQUFRa0MsS0FBSyxDQUFDLDJCQUEyQkE7Z0JBQzNDO1lBQ0Y7UUFDRjtJQUNGLEdBQUc7UUFBQ3JDO0tBQVE7SUFFWixJQUFJQyxXQUFXLFdBQVc7UUFDeEIscUJBQ0UsOERBQUNxQztZQUFJQyxPQUFPO2dCQUFFQyxTQUFTO2dCQUFRQyxXQUFXO1lBQVM7c0JBQ2pELDRFQUFDQzswQkFBRzs7Ozs7Ozs7Ozs7SUFHVjtJQUVBLElBQUksQ0FBQzFDLFNBQVM7UUFDWixxQkFDRSw4REFBQ3NDO1lBQUlDLE9BQU87Z0JBQUVDLFNBQVM7Z0JBQVFDLFdBQVc7WUFBUzs7OEJBQ2pELDhEQUFDQzs4QkFBRzs7Ozs7OzhCQUNKLDhEQUFDQzs4QkFBRTs7Ozs7OzhCQUNILDhEQUFDQztvQkFDQ0MsU0FBUyxJQUFNaEQsdURBQU1BLENBQUMsVUFBVTs0QkFBRWlELGFBQWE7d0JBQVM7b0JBQ3hEUCxPQUFPO3dCQUNMUSxZQUFZO3dCQUNaQyxPQUFPO3dCQUNQQyxRQUFRO3dCQUNSVCxTQUFTO3dCQUNUVSxjQUFjO3dCQUNkQyxRQUFRO3dCQUNSQyxVQUFVO29CQUNaOzhCQUNEOzs7Ozs7Ozs7Ozs7SUFLUDtJQUVBLHFCQUFPLDhEQUFDZDtRQUFJZSxJQUFHOzs7Ozs7QUFDakI7R0E3RndCdkQ7O1FBQ1lGLHVEQUFVQTs7O0tBRHRCRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9DbXNDb21wb25lbnQuanM/NmE2NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHVzZVNlc3Npb24sIHNpZ25JbiB9IGZyb20gJ25leHQtYXV0aC9yZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ21zQ29tcG9uZW50KCkge1xuICBjb25zdCB7IGRhdGE6IHNlc3Npb24sIHN0YXR1cyB9ID0gdXNlU2Vzc2lvbigpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2Vzc2lvbj8uYWNjZXNzVG9rZW4pIHtcbiAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0xvYWRpbmcgRGVjYXAgQ01TLi4uJylcbiAgICAgICAgICBjb25zdCBDTVMgPSAoYXdhaXQgaW1wb3J0KCdkZWNhcC1jbXMtYXBwJykpLmRlZmF1bHRcblxuICAgICAgICAgIGF3YWl0IENNUy5pbml0KHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICBsb2FkX2NvbmZpZ19maWxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgYmFja2VuZDoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdnaXRodWInLFxuICAgICAgICAgICAgICAgIHJlcG86IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dJVEhVQl9SRVBPX0ZVTExfTkFNRSxcbiAgICAgICAgICAgICAgICBicmFuY2g6ICdtYWluJyxcbiAgICAgICAgICAgICAgICBhdXRoX3R5cGU6ICdvYXV0aCcsXG4gICAgICAgICAgICAgICAgYmFzZV91cmw6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgICAgICAgICAgYXV0aF9lbmRwb2ludDogJ2FwaS9hdXRoJyxcbiAgICAgICAgICAgICAgICBhcHBfaWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX09BVVRIX0NMSUVOVF9JRCxcbiAgICAgICAgICAgICAgICBhdXRoX3Njb3BlOiAncmVwbyx1c2VyJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBtZWRpYV9mb2xkZXI6ICdwdWJsaWMvdXBsb2FkcycsXG4gICAgICAgICAgICAgIHB1YmxpY19mb2xkZXI6ICcvdXBsb2FkcycsXG4gICAgICAgICAgICAgIGNvbGxlY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ3BhZ2VzJyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnUGFnZXMnLFxuICAgICAgICAgICAgICAgICAgZm9sZGVyOiAnY29udGVudC9wYWdlcycsXG4gICAgICAgICAgICAgICAgICBjcmVhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ1RpdGxlJywgbmFtZTogJ3RpdGxlJywgd2lkZ2V0OiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnQm9keScsIG5hbWU6ICdib2R5Jywgd2lkZ2V0OiAnbWFya2Rvd24nIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdwcm9kdWN0cycsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogJ1Byb2R1Y3RzJyxcbiAgICAgICAgICAgICAgICAgIGZvbGRlcjogJ2NvbnRlbnQvcHJvZHVjdHMnLFxuICAgICAgICAgICAgICAgICAgY3JlYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUaXRsZScsIG5hbWU6ICd0aXRsZScsIHdpZGdldDogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ0ltYWdlJywgbmFtZTogJ2ltYWdlJywgd2lkZ2V0OiAnaW1hZ2UnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdEZXNjcmlwdGlvbicsIG5hbWU6ICdkZXNjcmlwdGlvbicsIHdpZGdldDogJ21hcmtkb3duJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnUHJpY2UnLCBuYW1lOiAncHJpY2UnLCB3aWRnZXQ6ICdudW1iZXInLCB2YWx1ZV90eXBlOiAnZmxvYXQnIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGxvY2FsX2JhY2tlbmQ6IGZhbHNlLFxuICAgICAgICAgICAgICBwdWJsaXNoX21vZGU6ICdlZGl0b3JpYWxfd29ya2Zsb3cnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZygnQ01TIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseScpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIENNUzonLCBlcnJvcilcbiAgICAgICAgfVxuICAgICAgfSkoKVxuICAgIH1cbiAgfSwgW3Nlc3Npb25dKVxuXG4gIGlmIChzdGF0dXMgPT09IFwibG9hZGluZ1wiKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHgnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICA8aDI+TG9hZGluZyBhdXRoZW50aWNhdGlvbi4uLjwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBpZiAoIXNlc3Npb24pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCcsIHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxoMj5BZG1pbiBBY2Nlc3MgUmVxdWlyZWQ8L2gyPlxuICAgICAgICA8cD5QbGVhc2Ugc2lnbiBpbiB3aXRoIEdpdEh1YiB0byBhY2Nlc3MgdGhlIGFkbWluIHBhbmVsPC9wPlxuICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNpZ25JbignZ2l0aHViJywgeyBjYWxsYmFja1VybDogJy9hZG1pbicgfSl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMjQyOTJlJyxcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMTBweCAyMHB4JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzVweCcsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCdcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgU2lnbiBpbiB3aXRoIEdpdEh1YlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIHJldHVybiA8ZGl2IGlkPVwibmMtcm9vdFwiIC8+XG59Il0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVNlc3Npb24iLCJzaWduSW4iLCJDbXNDb21wb25lbnQiLCJkYXRhIiwic2Vzc2lvbiIsInN0YXR1cyIsImFjY2Vzc1Rva2VuIiwiY29uc29sZSIsImxvZyIsIkNNUyIsImRlZmF1bHQiLCJpbml0IiwiY29uZmlnIiwibG9hZF9jb25maWdfZmlsZSIsImJhY2tlbmQiLCJuYW1lIiwicmVwbyIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19HSVRIVUJfUkVQT19GVUxMX05BTUUiLCJicmFuY2giLCJhdXRoX3R5cGUiLCJiYXNlX3VybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiYXV0aF9lbmRwb2ludCIsImFwcF9pZCIsIk5FWFRfUFVCTElDX09BVVRIX0NMSUVOVF9JRCIsImF1dGhfc2NvcGUiLCJtZWRpYV9mb2xkZXIiLCJwdWJsaWNfZm9sZGVyIiwiY29sbGVjdGlvbnMiLCJsYWJlbCIsImZvbGRlciIsImNyZWF0ZSIsImZpZWxkcyIsIndpZGdldCIsInZhbHVlX3R5cGUiLCJsb2NhbF9iYWNrZW5kIiwicHVibGlzaF9tb2RlIiwiZXJyb3IiLCJkaXYiLCJzdHlsZSIsInBhZGRpbmciLCJ0ZXh0QWxpZ24iLCJoMiIsInAiLCJidXR0b24iLCJvbkNsaWNrIiwiY2FsbGJhY2tVcmwiLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJjdXJzb3IiLCJmb250U2l6ZSIsImlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/CmsComponent.js\n"));

/***/ })

}]);