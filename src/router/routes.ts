import { createBrowserRouter } from 'react-router-dom';
import { HomepageDesktop } from '../screens/HomepageDesktop';
import { ConnectWallet } from '../screens/ConnectWallet';
import { MarketplaceDesktop } from '../screens/MarketplaceDesktop';
import { ArtistPageDesktop } from '../screens/ArtistPageDesktop';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomepageDesktop,
  },
  {
    path: '/connect-wallet',
    Component: ConnectWallet,
  },
  {
    path: '/marketplace',
    Component: MarketplaceDesktop,
  },
  {
    path: '/profile',
    Component: ArtistPageDesktop,
  }
]);
