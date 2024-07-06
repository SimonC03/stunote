'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { FAQ_DATA } from '@/lib/FAQ';
import { JOBS_DATA, Job } from '@/lib/jobs';
import { createApplication, createMessage } from '@/lib/api';

interface ContactFormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  jobTitle: string;
  jobId?: number;
}

const contactTypes = [
  "Report a Bug",
  "Feedback",
  "Missing Course",
  "Other"
];

const ContactPage = () => {
  const { register: contactRegister, handleSubmit: handleContactSubmit, reset: resetContactForm, setValue: setContactValue } = useForm<ContactFormData>();
  const { register: applicationRegister, handleSubmit: handleApplicationSubmit, reset: resetApplicationForm, setValue: setApplicationValue } = useForm<ApplicationFormData>();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'faq' | 'jobs'>('about');
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [applyingJobTitle, setApplyingJobTitle] = useState('Spontaneous Application');
  const router = useRouter();
  const [contactMessageLength, setContactMessageLength] = useState(0);
  const [applicationMessageLength, setApplicationMessageLength] = useState(0);

  useEffect(() => {
    if (user) {
      setContactValue('name', user.name);
      setContactValue('email', user.email);
      setApplicationValue('name', user.name);
      setApplicationValue('email', user.email);
      setApplicationValue('phone', user.phone);
    }
  }, [user, setContactValue, setApplicationValue]);

  const handleContactMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactMessageLength(event.target.value.length);
  };

  const handleApplicationMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApplicationMessageLength(event.target.value.length);
  };

  const onSubmitContact: SubmitHandler<ContactFormData> = async (data) => {
    setLoading(true);
    try {
      await createMessage({
        name: data.name,
        email: data.email,
        type: data.type,
        message: data.message,
      });
      toast.success('Your message has been sent successfully.');
      resetContactForm();
      setContactMessageLength(0);
    } catch (error) {
      toast.error('Error sending form.');
      console.error('Error sending form:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitApplication: SubmitHandler<ApplicationFormData> = async (data) => {
    setLoading(true);
    try {
      await createApplication({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        jobTitle: data.jobTitle,
      });
      toast.success('Your application has been sent successfully.');
      resetApplicationForm();
      setExpandedJobId(null);
      setApplyingJobTitle('Spontaneous Application');
      setApplicationMessageLength(0);
    } catch (error) {
      toast.error('Error sending form.');
      console.error('Error sending form:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleJobDetails = (jobId: number) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  const applyForJob = (jobId: number, jobTitle: string) => {
    setExpandedJobId(jobId);
    setApplyingJobTitle(jobTitle);
    setApplicationValue('jobTitle', jobTitle);
  };

  return (
    <ProtectedRoute>
      <div className="container">
        <div className="selection-container">
          <button 
            className={`tab ${activeTab === 'about' ? 'active' : ''}`} 
            onClick={() => setActiveTab('about')}
          >
            About Us
          </button>
          <button 
            className={`tab ${activeTab === 'contact' ? 'active' : ''}`} 
            onClick={() => setActiveTab('contact')}
          >
            Contact Us
          </button>
          <button 
            className={`tab ${activeTab === 'jobs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('jobs')}
          >
            Careers
          </button>
          <button 
            className={`tab ${activeTab === 'faq' ? 'active' : ''}`} 
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
        </div>
        <div className="content-container">
        {activeTab === 'about' && (
            <div className="about-us">
                <h1 className="text-m md:text-2xl font-bold text-gray-800 mb-4 text-center">About Us</h1>
                <p className="text-gray-600">
                Welcome to StuNote! We are dedicated to transforming the way students collaborate and learn. Our platform seamlessly facilitates the sharing and accessing of study materials, promoting knowledge exchange and fostering a community of learning. 📚💡
                </p>
                <p className="text-gray-600 mt-4">
                <strong>Our Mission</strong><br />
                At StuNote, our mission is to include all students. We provide carefully crafted notes for all courses, making learning more accessible for everyone. Our high-quality notes and study materials help students optimize their studies and achieve academic success.
                </p>
                <p className="text-gray-600 mt-4">
                <strong>Our Vision</strong><br />
                We envision a world where every student has the tools they need to succeed academically. By leveraging technology, we aim to bridge the gap between traditional education methods and the digital age, providing students with a seamless and integrated learning experience.
                </p>
                <p className="text-gray-600 mt-4">
                <strong>Why Choose StuNote?</strong><br />
                - <strong>Innovative Features:</strong> Our platform is equipped with cutting-edge tools designed to enhance your study sessions and keep you organized.<br />
                - <strong>User-Friendly Interface:</strong> We prioritize ease of use, ensuring that you can focus on learning rather than navigating complicated software.<br />
                - <strong>Community Support:</strong> Join a growing community of students who share your commitment to academic excellence.<br />
                </p>
                <p className="text-gray-600 mt-4">
                Thank you for choosing StuNote. We are excited to support you on your educational journey and look forward to helping you achieve your academic dreams.
                </p>
                <p className="text-gray-600 mt-4">
                If you have any questions or feedback, please don&#39;t hesitate to contact us. Your success is our priority!
                </p>
            </div>
            )}


          {activeTab === 'contact' && (
            <form onSubmit={handleContactSubmit(onSubmitContact)} className="space-y-4 contact-form">
              <h1 className="text-m md:text-2xl font-bold text-gray-800 mb-4 text-center">Contact Us</h1>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="name"
                    type="text"
                    {...contactRegister('name', { required: true })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    {...contactRegister('email', { required: true })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    id="type"
                    {...contactRegister('type', { required: true })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {contactTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    {...contactRegister('message', { required: true, maxLength: 2000 })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleContactMessageChange}
                  />
                  <p>{contactMessageLength} / 2000 characters</p>
                </div>
              </div>
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="w-full py-2 px-4 font-semibold shadow-sm"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
          {activeTab === 'faq' && (
            <div className="faq">
              <h1 className="text-m md:text-2xl font-bold text-gray-800 mb-4 text-center">Frequently Asked Questions</h1>
              <div className="space-y-4">
                {FAQ_DATA.map((faq, index) => (
                  <div key={index}>
                    <h2 className="text-m md:text-xl font-semibold text-gray-800">{faq.question}</h2>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'jobs' && (
            <div className="jobs">
              <h1 className="text-m md:text-2xl font-bold text-gray-800 mb-4 text-center">CAREERS AT STUNOTE</h1>
              <ul className="job-list mt-8">
                <h2 className="text-m md:text-xl font-bold text-gray-800 mb-2">Job List</h2>
                {JOBS_DATA.map((job) => (
                  <li key={job.id} className="job-item" onClick={() => toggleJobDetails(job.id)}>
                    <h3 className="text-m md:text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.type} - {job.location}</p>
                    {expandedJobId === job.id && (
                      <div className="job-details mt-2">
                        <p className="text-gray-600"><strong>Description:</strong> {job.description}</p>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => applyForJob(job.id, job.title)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <form onSubmit={handleApplicationSubmit(onSubmitApplication)} className="space-y-4 application-form">
                <h2 className="text-m md:text-xl font-bold text-gray-800 mb-2">Application Form</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      id="name"
                      type="text"
                      {...applicationRegister('name', { required: true })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...applicationRegister('email', { required: true })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      id="phone"
                      type="text"
                      {...applicationRegister('phone', { required: true })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                      id="jobTitle"
                      type="text"
                      {...applicationRegister('jobTitle', { required: true })}
                      value={applyingJobTitle}
                      readOnly
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      {...applicationRegister('message', { required: true, maxLength: 2000 })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      onChange={handleApplicationMessageChange}
                    />
                    <p>{applicationMessageLength} / 2000 characters</p>
                  </div>
                </div>
                <p>We will reach out to you as soon as possible.</p>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className="w-full py-2 px-4 font-semibold shadow-sm"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Application'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          margin-top: 20px;
          padding: 10px;
        }
        .selection-container {
          display: flex;
          justify-content: center;
          height: 40px;
          margin-bottom: 5px;
        }
        .tab {
          flex: 1;
          padding: 10px 20px;
          margin: 0;
          border: none;
          background: none;
          color: #D9D9D8;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
          background-color: #F6F6F6;
        }
        .tab.active {
          background-color: #47ABFE;
          color: white;
        }
        .content-container {
          display: flex;
          justify-content: center;
          background-color: white;
          padding: 20px;
          width: 100%;
        }
        .about-us, .faq, .jobs {
          max-width: 800px;
          width: 100%;
          text-align: left;

        }
        .contact-form, .application-form {
          max-width: 800px;
          width: 100%;
        }
        .job-list {
          list-style-type: none;
          padding: 0;
          margin-top: 20px;
        }
        .job-item {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .job-item:hover {
          background-color: #f0f0f0;
        }
        .job-details {
          margin-top: 10px;
        }
        .job-details p {
          margin-bottom: 10px;
        }
        @media (max-width: 1023px) {
          .container {
            padding: 5px;
          }
          .selection-container {
            height: auto;
          }
          .tab {
            font-size: 12px;
            padding: 5px 10px;
            margin-bottom: 5px;
          }
          .content-container {
            padding: 10px;
            font-size: 12px;
          }
          .about-us, .faq, .jobs {
            max-width: 100%;
          }
          .contact-form, .application-form {
            max-width: 100%;
          }
          .job-item {
            padding: 5px;
          }
          .job-details {
            padding: 5px;
          }

        @media (max-width: 768px) {
          .container {
            padding: 5px;
          }
          .selection-container {
            height: auto;
          }
          .tab {
            font-size: 10px;
            padding: 5px 10px;
            margin-bottom: 5px;
          }
          .content-container {
            padding: 10px;
            font-size: 10px;
          }
          .about-us, .faq, .jobs {
            max-width: 100%;
          }
          .contact-form, .application-form {
            max-width: 100%;
          }
          .job-item {
            padding: 5px;
          }
          .job-details {
            padding: 5px;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
};

export default ContactPage;
