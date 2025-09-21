import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Logo from '../assets/ce-logo.png';
import { 
  FaUsers, 
  FaLock, 
  FaMobile, 
  FaBolt, 
  FaHeart,
  FaComments,
  FaUserFriends,
  FaShieldAlt,
  FaRocket,
  FaGithub,
  FaTwitter,
  FaEnvelope
} from 'react-icons/fa';

function LandingPage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  const features = [
    {
      icon: <FaComments className="text-3xl text-blue-500" />,
      title: "Real-time Messaging",
      description: "Send and receive messages instantly with our lightning-fast chat system."
    },
    {
      icon: <FaUserFriends className="text-3xl text-purple-500" />,
      title: "Friend System",
      description: "Connect with friends, send requests, and build your chat network easily."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-green-500" />,
      title: "Secure & Private",
      description: "Your conversations are protected with end-to-end encryption and privacy controls."
    },
    {
      icon: <FaMobile className="text-3xl text-orange-500" />,
      title: "Cross-Platform",
      description: "Access your chats from any device - mobile, tablet, or desktop."
    },
    {
      icon: <FaBolt className="text-3xl text-yellow-500" />,
      title: "Lightning Fast",
      description: "Optimized performance ensures your messages are delivered in milliseconds."
    },
    {
      icon: <FaHeart className="text-3xl text-red-500" />,
      title: "User-Friendly",
      description: "Intuitive design that makes chatting enjoyable and effortless for everyone."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl">
                <img src={Logo} alt="Can-e-Chat Logo" className="w-16 h-16" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
                Can-e-Chat
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Connect, chat, and share with friends in real-time. Experience the future of messaging with our secure, fast, and intuitive platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Can-e-Chat?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the features that make Can-e-Chat the perfect choice for your communication needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              >
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">Active Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-lg opacity-90">Messages Sent</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-lg opacity-90">Uptime</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Chatting?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of users who have already discovered the joy of seamless communication with Can-e-Chat.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <FaRocket className="mr-2" />
              Join Can-e-Chat Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2">
                  <img src={Logo} alt="Can-e-Chat Logo" className="w-full h-full" />
                </div>
                <span className="text-xl font-bold">Can-e-Chat</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Connecting people through seamless, secure, and lightning-fast messaging. Experience the future of communication.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaGithub className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaEnvelope className="text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Can-e-Chat. All rights reserved. Built with ❤️ for seamless communication.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;