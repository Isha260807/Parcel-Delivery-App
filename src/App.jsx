import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { BookingProvider } from './store/BookingStore';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <AppRouter />
      </BookingProvider>
    </BrowserRouter>
  );
}
