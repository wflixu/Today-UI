import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App: React.SFC = () => {
    return (
        <h2>hello  today UI</h2>
    );
};



ReactDOM.render(<App  />,
    document.getElementById('root') as HTMLElement);