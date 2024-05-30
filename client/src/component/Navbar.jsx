import React,{useState} from 'react'
import logo from "../assets/logo.png";
import Modal from './LoginModal';
import { Dropdown } from "flowbite-react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {

  const [isCollapsed, setCollapsed] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('signup');
  const { isLoggedIn, profile, logOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setCollapsed(!isCollapsed);
  };

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const switchModalType = () => {
    setModalType((prevType) => (prevType === 'signup' ? 'login' : 'signup'));
  };
  const handleLogout = () => {
    logOut();
};


const handleAdminDashboardClick = () => {
  navigate('/admin');
};
  return (
   <>
   

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} class="h-8" alt="Flowbite Logo" className='h-8'/>
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Furno</span>
  </a>
  <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
   <div className='flex gap-4'>
{
  isLoggedIn?(
    <Dropdown label={profile && (profile.name)} inline className='z-50'>
      <Dropdown.Item>{profile && (profile.name)}</Dropdown.Item>
      {isAdmin?(  <Dropdown.Item>Admin</Dropdown.Item>):(  <Dropdown.Item>Not admin</Dropdown.Item>)}
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item onClick={handleAdminDashboardClick}>Admin Dashboard</Dropdown.Item>
    
      <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
    </Dropdown>
  ):(<div>

    <button onClick={() => openModal('signup')}>
      {/* Signup Icon */}
      <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.3333 14V8.16669H25.6666V15.1667H23.3333M23.3333 19.8334H25.6666V17.5H23.3333M11.6666 15.1667C14.7816 15.1667 21 16.73 21 19.8334V23.3334H2.33331V19.8334C2.33331 16.73 8.55165 15.1667 11.6666 15.1667ZM11.6666 4.66669C12.9043 4.66669 14.0913 5.15835 14.9665 6.03352C15.8416 6.90869 16.3333 8.09568 16.3333 9.33335C16.3333 10.571 15.8416 11.758 14.9665 12.6332C14.0913 13.5084 12.9043 14 11.6666 14C10.429 14 9.24198 13.5084 8.36682 12.6332C7.49164 11.758 6.99998 10.571 6.99998 9.33335C6.99998 8.09568 7.49164 6.90869 8.36682 6.03352C9.24198 5.15835 10.429 4.66669 11.6666 4.66669ZM11.6666 17.3834C8.20165 17.3834 4.54998 19.0867 4.54998 19.8334V21.1167H18.7833V19.8334C18.7833 19.0867 15.1316 17.3834 11.6666 17.3834ZM11.6666 6.88335C11.0169 6.88335 10.3944 7.1381 9.92438 7.60819C9.45429 8.07828 9.19998 8.70076 9.19998 9.35002C9.19998 9.99928 9.45429 10.6218 9.92438 11.0919C10.3944 11.5619 11.0169 11.8167 11.6666 11.8167C12.3159 11.8167 12.9384 11.5619 13.4085 11.0919C13.8786 10.6218 14.1333 9.99928 14.1333 9.35002C14.1333 8.70076 13.8786 8.07828 13.4085 7.60819C12.9384 7.1381 12.3159 6.88335 11.6666 6.88335Z" fill="currentColor" />
      </svg>
    </button>
  
</div>)
}

      <div>

      
      <svg
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.5 24.5L19.2663 19.257M22.1666 12.25C22.1666 14.88 21.1219 17.4024 19.2621 19.2621C17.4024 21.1219 14.88 22.1666 12.25 22.1666C9.61992 22.1666 7.09757 21.1219 5.23784 19.2621C3.3781 17.4024 2.33331 14.88 2.33331 12.25C2.33331 9.61992 3.3781 7.09757 5.23784 5.23784C7.09757 3.3781 9.61992 2.33331 12.25 2.33331C14.88 2.33331 17.4024 3.3781 19.2621 5.23784C21.1219 7.09757 22.1666 9.61992 22.1666 12.25V12.25Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      </div>
      <div>
      <svg
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.16668 3.5C4.94551 3.5 2.33334 6.08533 2.33334 9.275C2.33334 11.8498 3.35418 17.9608 13.4027 24.1383C13.5827 24.2479 13.7893 24.3058 14 24.3058C14.2107 24.3058 14.4173 24.2479 14.5973 24.1383C24.6458 17.9608 25.6667 11.8498 25.6667 9.275C25.6667 6.08533 23.0545 3.5 19.8333 3.5C16.6122 3.5 14 7 14 7C14 7 11.3878 3.5 8.16668 3.5Z"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      </div>
      <div>

     
      <svg
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.2355 19.1926H8.95234L9.76991 17.5273L23.3543 17.5027C23.8137 17.5027 24.2074 17.1746 24.2894 16.7207L26.1707 6.19062C26.2199 5.91445 26.1461 5.63008 25.9656 5.41406C25.8764 5.30775 25.7652 5.22211 25.6396 5.16309C25.514 5.10407 25.377 5.07308 25.2383 5.07227L7.95702 5.01484L7.80937 4.32031C7.7164 3.87734 7.31718 3.55469 6.86328 3.55469H2.63867C2.38267 3.55469 2.13716 3.65638 1.95614 3.8374C1.77513 4.01841 1.67343 4.26393 1.67343 4.51992C1.67343 4.77592 1.77513 5.02143 1.95614 5.20245C2.13716 5.38346 2.38267 5.48516 2.63867 5.48516H6.08124L6.72656 8.55312L8.31523 16.2449L6.26992 19.5836C6.1637 19.727 6.09972 19.8972 6.08523 20.075C6.07073 20.2528 6.10629 20.4312 6.18788 20.5898C6.35195 20.9152 6.68281 21.1203 7.04921 21.1203H8.7664C8.40032 21.6065 8.20258 22.1988 8.20312 22.8074C8.20312 24.3551 9.46093 25.6129 11.0086 25.6129C12.5562 25.6129 13.8141 24.3551 13.8141 22.8074C13.8141 22.1977 13.6117 21.6043 13.2508 21.1203H17.6559C17.2898 21.6065 17.092 22.1988 17.0926 22.8074C17.0926 24.3551 18.3504 25.6129 19.898 25.6129C21.4457 25.6129 22.7035 24.3551 22.7035 22.8074C22.7035 22.1977 22.5012 21.6043 22.1402 21.1203H25.2383C25.7687 21.1203 26.2035 20.6883 26.2035 20.1551C26.2019 19.8994 26.0993 19.6546 25.9179 19.4743C25.7366 19.294 25.4913 19.1927 25.2355 19.1926ZM8.35898 6.91797L24.1035 6.96992L22.5613 15.6051L10.1937 15.627L8.35898 6.91797ZM11.0086 23.6715C10.5328 23.6715 10.1445 23.2832 10.1445 22.8074C10.1445 22.3316 10.5328 21.9434 11.0086 21.9434C11.4844 21.9434 11.8726 22.3316 11.8726 22.8074C11.8726 23.0366 11.7816 23.2564 11.6196 23.4184C11.4575 23.5805 11.2378 23.6715 11.0086 23.6715ZM19.898 23.6715C19.4223 23.6715 19.034 23.2832 19.034 22.8074C19.034 22.3316 19.4223 21.9434 19.898 21.9434C20.3738 21.9434 20.7621 22.3316 20.7621 22.8074C20.7621 23.0366 20.6711 23.2564 20.509 23.4184C20.347 23.5805 20.1272 23.6715 19.898 23.6715Z"
          fill="black"
        />
      </svg>
      </div>
   </div>
      
      <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div class="px-4 py-3">
          <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul class="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      <button data-collapse-toggle="navbar-user"  onClick={toggleNavbar}  aria-expanded={!isCollapsed} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" >
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isCollapsed ? 'hidden' : ''}`} id="navbar-user">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="/about" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="/allProduct" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop</a>
      </li>

      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
{isModalOpen && <Modal type={modalType} onClose={closeModal} onSwitch={switchModalType} />}

   </>
  )
}
