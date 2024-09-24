import { ChatBox, Footer, Introduction } from './components';

const App = () => {
  return (
    <div className="gradient-background bg-primary">
      <div className="emojis-background"></div>
      <div className='components-container'>
        <Introduction />
        <ChatBox />
      </div>
      <Footer />
    </div>
  );
};

export default App;
