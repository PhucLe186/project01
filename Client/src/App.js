import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import Default from '~/user/component/default';
import { AuthProvider } from './AuthContext';

function App() {
    return (
        <AuthProvider>
            <div>
                <Router>
                    <div>
                        <Routes>
                            {publicRoutes.map((route, idx) => {
                                let Layout = Default;

                                const Page = route.component;
                                if (route.layout === null) {
                                    Layout = Fragment;
                                } else if (route.layout) {
                                    Layout = route.layout;
                                }
                                return (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
