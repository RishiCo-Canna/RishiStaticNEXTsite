"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["src_components_CmsComponent_tsx"],{

/***/ "./src/components/CmsComponent.tsx":
/*!*****************************************!*\
  !*** ./src/components/CmsComponent.tsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\nconst CmsComponent = ()=>{\n    _s();\n    const [cmsLoaded, setCmsLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        let mounted = true;\n        const loadCms = async ()=>{\n            try {\n                const CMS = await __webpack_require__.e(/*! import() */ \"node_modules_decap-cms-app_dist_decap-cms-app_js\").then(__webpack_require__.t.bind(__webpack_require__, /*! decap-cms-app */ \"./node_modules/decap-cms-app/dist/decap-cms-app.js\", 23));\n                if (!mounted) return;\n                if (!CMS || !CMS.default) {\n                    throw new Error(\"Failed to load CMS module\");\n                }\n                const config = {\n                    backend: {\n                        name: \"github\",\n                        repo: \"RishiCo-Canna/RishiStaticNEXTsite\",\n                        branch: \"main\",\n                        base_url: window.location.origin,\n                        auth_endpoint: \"api/auth\"\n                    },\n                    local_backend: \"development\" === \"development\",\n                    media_folder: \"public/images\",\n                    public_folder: \"/images\",\n                    collections: [\n                        {\n                            name: \"pages\",\n                            label: \"Pages\",\n                            folder: \"content/pages\",\n                            create: true,\n                            fields: [\n                                {\n                                    label: \"Title\",\n                                    name: \"title\",\n                                    widget: \"string\"\n                                },\n                                {\n                                    label: \"Body\",\n                                    name: \"body\",\n                                    widget: \"markdown\"\n                                }\n                            ]\n                        }\n                    ]\n                };\n                await CMS.default.init({\n                    config\n                });\n                setCmsLoaded(true);\n            } catch (error) {\n                console.error(\"Failed to initialize CMS:\", error);\n                setError(error);\n            }\n        };\n        loadCms();\n        return ()=>{\n            mounted = false;\n            if (window.CMS) {\n                try {\n                    // Cleanup CMS instance\n                    window.CMS = undefined;\n                    setCmsLoaded(false);\n                } catch (error) {\n                    console.error(\"Error during CMS cleanup:\", error);\n                }\n            }\n        };\n    }, []);\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"cms-error\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                    children: \"Error Loading CMS\"\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/src/components/CmsComponent.tsx\",\n                    lineNumber: 74,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pre\", {\n                    children: error.message\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/src/components/CmsComponent.tsx\",\n                    lineNumber: 75,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/runner/workspace/src/components/CmsComponent.tsx\",\n            lineNumber: 73,\n            columnNumber: 7\n        }, undefined);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        id: \"nc-root\"\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/src/components/CmsComponent.tsx\",\n        lineNumber: 80,\n        columnNumber: 10\n    }, undefined);\n};\n_s(CmsComponent, \"QhsoegyGNMB0C5kgBuyZWGUCGFg=\");\n_c = CmsComponent;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CmsComponent);\nvar _c;\n$RefreshReg$(_c, \"CmsComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9DbXNDb21wb25lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDbUQ7QUFHbkQsTUFBTUcsZUFBZTs7SUFDbkIsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdILCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ0ksT0FBT0MsU0FBUyxHQUFHTCwrQ0FBUUEsQ0FBZTtJQUVqREQsZ0RBQVNBLENBQUM7UUFDUixJQUFJTyxVQUFVO1FBRWQsTUFBTUMsVUFBVTtZQUNkLElBQUk7Z0JBQ0YsTUFBTUMsTUFBTSxNQUFNLDhOQUFPO2dCQUV6QixJQUFJLENBQUNGLFNBQVM7Z0JBRWQsSUFBSSxDQUFDRSxPQUFPLENBQUNBLElBQUlDLE9BQU8sRUFBRTtvQkFDeEIsTUFBTSxJQUFJQyxNQUFNO2dCQUNsQjtnQkFFQSxNQUFNQyxTQUFvQjtvQkFDeEJDLFNBQVM7d0JBQ1BDLE1BQU07d0JBQ05DLE1BQU07d0JBQ05DLFFBQVE7d0JBQ1JDLFVBQVVDLE9BQU9DLFFBQVEsQ0FBQ0MsTUFBTTt3QkFDaENDLGVBQWU7b0JBQ2pCO29CQUNBQyxlQUFlQyxrQkFBeUI7b0JBQ3hDQyxjQUFjO29CQUNkQyxlQUFlO29CQUNmQyxhQUFhO3dCQUNYOzRCQUNFWixNQUFNOzRCQUNOYSxPQUFPOzRCQUNQQyxRQUFROzRCQUNSQyxRQUFROzRCQUNSQyxRQUFRO2dDQUNOO29DQUFFSCxPQUFPO29DQUFTYixNQUFNO29DQUFTaUIsUUFBUTtnQ0FBUztnQ0FDbEQ7b0NBQUVKLE9BQU87b0NBQVFiLE1BQU07b0NBQVFpQixRQUFRO2dDQUFXOzZCQUNuRDt3QkFDSDtxQkFDRDtnQkFDSDtnQkFFQSxNQUFNdEIsSUFBSUMsT0FBTyxDQUFDc0IsSUFBSSxDQUFDO29CQUFFcEI7Z0JBQU87Z0JBQ2hDUixhQUFhO1lBQ2YsRUFBRSxPQUFPQyxPQUFPO2dCQUNkNEIsUUFBUTVCLEtBQUssQ0FBQyw2QkFBNkJBO2dCQUMzQ0MsU0FBU0Q7WUFDWDtRQUNGO1FBRUFHO1FBRUEsT0FBTztZQUNMRCxVQUFVO1lBQ1YsSUFBSVcsT0FBT1QsR0FBRyxFQUFFO2dCQUNkLElBQUk7b0JBQ0YsdUJBQXVCO29CQUN2QlMsT0FBT1QsR0FBRyxHQUFHeUI7b0JBQ2I5QixhQUFhO2dCQUNmLEVBQUUsT0FBT0MsT0FBTztvQkFDZDRCLFFBQVE1QixLQUFLLENBQUMsNkJBQTZCQTtnQkFDN0M7WUFDRjtRQUNGO0lBQ0YsR0FBRyxFQUFFO0lBRUwsSUFBSUEsT0FBTztRQUNULHFCQUNFLDhEQUFDOEI7WUFBSUMsV0FBVTs7OEJBQ2IsOERBQUNDOzhCQUFHOzs7Ozs7OEJBQ0osOERBQUNDOzhCQUFLakMsTUFBTWtDLE9BQU87Ozs7Ozs7Ozs7OztJQUd6QjtJQUVBLHFCQUFPLDhEQUFDSjtRQUFJSyxJQUFHOzs7Ozs7QUFDakI7R0E1RU10QztLQUFBQTtBQThFTiwrREFBZUEsWUFBWUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9DbXNDb21wb25lbnQudHN4PzJiZjEiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQ21zQ29uZmlnIH0gZnJvbSAnZGVjYXAtY21zLWNvcmUnO1xuXG5jb25zdCBDbXNDb21wb25lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IFtjbXNMb2FkZWQsIHNldENtc0xvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8RXJyb3IgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBtb3VudGVkID0gdHJ1ZTtcbiAgICBcbiAgICBjb25zdCBsb2FkQ21zID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgQ01TID0gYXdhaXQgaW1wb3J0KCdkZWNhcC1jbXMtYXBwJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW1vdW50ZWQpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGlmICghQ01TIHx8ICFDTVMuZGVmYXVsdCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgQ01TIG1vZHVsZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgICAgICAgYmFja2VuZDoge1xuICAgICAgICAgICAgbmFtZTogJ2dpdGh1YicsXG4gICAgICAgICAgICByZXBvOiAnUmlzaGlDby1DYW5uYS9SaXNoaVN0YXRpY05FWFRzaXRlJyxcbiAgICAgICAgICAgIGJyYW5jaDogJ21haW4nLFxuICAgICAgICAgICAgYmFzZV91cmw6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgICAgICBhdXRoX2VuZHBvaW50OiAnYXBpL2F1dGgnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsb2NhbF9iYWNrZW5kOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyxcbiAgICAgICAgICBtZWRpYV9mb2xkZXI6ICdwdWJsaWMvaW1hZ2VzJyxcbiAgICAgICAgICBwdWJsaWNfZm9sZGVyOiAnL2ltYWdlcycsXG4gICAgICAgICAgY29sbGVjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3BhZ2VzJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdQYWdlcycsXG4gICAgICAgICAgICAgIGZvbGRlcjogJ2NvbnRlbnQvcGFnZXMnLFxuICAgICAgICAgICAgICBjcmVhdGU6IHRydWUsXG4gICAgICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUaXRsZScsIG5hbWU6ICd0aXRsZScsIHdpZGdldDogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnQm9keScsIG5hbWU6ICdib2R5Jywgd2lkZ2V0OiAnbWFya2Rvd24nIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBDTVMuZGVmYXVsdC5pbml0KHsgY29uZmlnIH0pO1xuICAgICAgICBzZXRDbXNMb2FkZWQodHJ1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gaW5pdGlhbGl6ZSBDTVM6JywgZXJyb3IpO1xuICAgICAgICBzZXRFcnJvcihlcnJvciBhcyBFcnJvcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWRDbXMoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBtb3VudGVkID0gZmFsc2U7XG4gICAgICBpZiAod2luZG93LkNNUykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIENsZWFudXAgQ01TIGluc3RhbmNlXG4gICAgICAgICAgd2luZG93LkNNUyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBzZXRDbXNMb2FkZWQoZmFsc2UpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBDTVMgY2xlYW51cDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY21zLWVycm9yXCI+XG4gICAgICAgIDxoMj5FcnJvciBMb2FkaW5nIENNUzwvaDI+XG4gICAgICAgIDxwcmU+e2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIDxkaXYgaWQ9XCJuYy1yb290XCIgLz47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDbXNDb21wb25lbnQ7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNtc0NvbXBvbmVudCIsImNtc0xvYWRlZCIsInNldENtc0xvYWRlZCIsImVycm9yIiwic2V0RXJyb3IiLCJtb3VudGVkIiwibG9hZENtcyIsIkNNUyIsImRlZmF1bHQiLCJFcnJvciIsImNvbmZpZyIsImJhY2tlbmQiLCJuYW1lIiwicmVwbyIsImJyYW5jaCIsImJhc2VfdXJsIiwid2luZG93IiwibG9jYXRpb24iLCJvcmlnaW4iLCJhdXRoX2VuZHBvaW50IiwibG9jYWxfYmFja2VuZCIsInByb2Nlc3MiLCJtZWRpYV9mb2xkZXIiLCJwdWJsaWNfZm9sZGVyIiwiY29sbGVjdGlvbnMiLCJsYWJlbCIsImZvbGRlciIsImNyZWF0ZSIsImZpZWxkcyIsIndpZGdldCIsImluaXQiLCJjb25zb2xlIiwidW5kZWZpbmVkIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDIiLCJwcmUiLCJtZXNzYWdlIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/CmsComponent.tsx\n"));

/***/ })

}]);