'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TextSkeleton from './settings/LoadingSklt';

export default function Skills() {
  const router = useRouter();
     const [skill, setSkill] = useState<string>('');
  const [skillvisi, setSkillvisi] = useState<boolean>(false);
  const [workings, setWorkings] = useState<any[]>([]);
  const [workLoading, setWorkLoading] = useState(true);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [certs, setCerts] = useState<any[]>([]);
  const [certLoading, setCertLoading] = useState(true);
  const [showAllCerts, setShowAllCerts] = useState(false);

  useEffect(() => {
    axios.get('/api/frontend/profile',{
      headers: {
          'Authorization': process.env.NEXT_PUBLIC_MY_API_KEY 
        }
    })
      .then(res => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          setSkill(data[2].content);
          setSkillvisi(data[2].visibility);
        } else if (data.content) {
          setSkill(data[2].content);
          setSkillvisi(data[2].visibility);
        }
      })
      .catch(() => setSkill('__loading__'));
  }, []);

  useEffect(() => {
    axios.get('/api/frontend/working', {
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_MY_API_KEY
      }
    })
      .then(res => {
        setWorkings(res.data);
        setWorkLoading(false);
      })
      .catch(() => setWorkings([]));
  }, []);

  useEffect(() => {
    axios.get('/api/frontend/certs', {
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_MY_API_KEY
      }
    })
      .then(res => {
        setCerts(res.data.filter((c: any) => c.visibility));
        setCertLoading(false);
      })
      .catch(() => setCerts([]));
  }, []);
  
  return (
    <>
      {/* Skills Section Header */}
      <div className="flex flex-row mt-5 mb-2.5" id="skills">
        <div className="typeH text-custom-typeH text-2xl font-playfair"></div>
        <span id="skilltype" className="text-2xl font-playfair text-custom-text"></span>
      </div>

      {/* Skills Section */}
      <div className="flex flex-row">
        <div className="w-1/2">
        

        
          {skillvisi === true ? (
            skill && skill !== '__loading__' ? (
              skill.split(/\r?\n/).map((item, idx) => {
                const match = item.match(/(.+?)\s*>>\s*\((\d+)\)/);
                if (!match) return null;
                const [_, label, percent] = match;
                return (
                  <div key={idx} className="w-[90%] h-5 bg-[#353535] rounded-[20px] mt-5 ml-[5%]">
                    <div
                      className="h-full bg-[#564a0095] rounded-[20px] flex flex-row p-0 items-center relative"
                      style={{ width: `${percent}%` }}
                    >
                      <p className="absolute left-2.5 text-sm text-custom-text m-0">{label.trim()}</p>
                      <p className="absolute right-2.5 text-sm text-custom-text m-0">{percent}%</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <TextSkeleton width="w-1/2" height="h-4" />
            )
          ) : (
            <p className="text-center text-custom-text2">-</p>
          )}
        

          {/* Experience Section */}
          <div className="mt-5">
            <div className="flex flex-row mt-5 mb-2.5">
              <div className="typeH text-custom-typeH text-2xl font-playfair"></div>
              <span id="experince" className="text-2xl font-playfair text-custom-text"></span>
            </div>

            <div className="workbg">
              <table className="w-full border-collapse text-custom-text2 font-space-mono mt-5">
                <tbody>
                  {workLoading ? (
                    <tr><td colSpan={2}><TextSkeleton width="w-full" height="h-8" /></td></tr>
                  ) : (
                    (workings.slice(0, 3)).map((work, idx) => (
                      <tr key={work.id || idx} className="mb-5 border-b border-custom-text2 flex items-start">
                        <td className="companylogo">
                          <img src={work.img && typeof work.img === 'string' ? work.img : '/assets/img/certlogo/mlsa.webp'} alt="" className="w-[100px] top-0" />
                        </td>
                        <td className="jobdetails">
                          <h5 className="m-0 p-0 ml-2.5 font-space-mono text-custom-text2 text-lg"><b>{work.position}</b></h5>
                          <p className="m-0 p-0 ml-2.5 font-space-mono text-custom-text2 text-sm text-left">
                            {work.company} · {work.working_type}
                          </p>
                          <p className="m-0 p-0 ml-2.5 font-space-mono text-custom-text2 text-sm text-left">
                            {new Date(work.start).toLocaleString('en-US', { year: 'numeric', month: 'short' })} - {work.end} ({work.address})
                          </p>
                          <br />
                          <p className="m-0 p-0 ml-2.5 font-space-mono text-custom-text2 text-sm text-left">
                            {work.discription}
                          </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {workings.length > 3 && (
                <button
                  className="mt-4 px-4 py-2 bg-transparent text-yellow-400 border border-yellow-400 rounded-lg shadow-md text-sm sm:text-base flex items-center gap-2 hover:bg-yellow-400 hover:text-black transition-colors"
                  onClick={() => router.push('/working-experience')}
                >
                  Show More
                  <span className="ml-1">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        <br />
        <br />
        <br />
        <br />
        <div className="w-1/2">
          <div className="flex flex-row mt-5 mb-2.5">
            <div className="typeH text-custom-typeH text-2xl font-playfair"></div>
            <span id="certtype" className="text-2xl font-playfair text-custom-text"></span>
          </div>
          <table className="w-full justify-center">
            <tbody>
              {certLoading ? (
                <tr><td><TextSkeleton width="w-full" height="h-8" /></td></tr>
              ) : certs.length === 0 ? (
                <tr><td className="text-center text-custom-text2">No certificates found.</td></tr>
              ) : (
                // Show only first 5 certs, with Show More button if more
                (showAllCerts ? certs : certs.slice(0, 5)).map((cert, idx) => (
      <tr key={cert.id || idx}>
        <td className="py-6 align-top">
          <div className="w-full max-w-2xl mx-auto flex flex-row items-center rounded-xl shadow-lg px-6 py-4 gap-6 border border-[#38404a] hover:shadow-2xl transition-shadow duration-300">
            <img src={cert.img || '/assets/img/certlogo/meta.webp'} alt="Certificate Logo" className="w-[80px] h-[80px] rounded-lg bg-center bg-no-repeat bg-cover border border-[#38404a] shadow-sm" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-lg flex items-center gap-2 text-[#bfa300] drop-shadow-none truncate">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5 text-[#bfa300] drop-shadow-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                {cert.certname}
              </p>
              <p className="text-custom-text2 text-base mt-1 truncate">{cert.company}</p>
              <p className="text-custom-text text-sm mt-1">Issued {new Date(cert.issuedate).toLocaleString('en-US', { year: 'numeric', month: 'short' })}</p>
              <p className="text-custom-text2 text-xs mt-1">ID: <span className="font-mono">{cert.veryfyid}</span></p>
              {cert.tag && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.tag.split(',').map((tag: string, i: number) => tag.trim() && (
                    <span key={i} className="inline-block px-2 py-0.5 text-xs bg-[#38404a] text-custom-text2 rounded-full font-mono">{tag.trim()}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end min-w-[90px]">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#38404a] text-custom-text2 rounded-full">Certificate</span>
            </div>
          </div>
        </td>
      </tr>
    ))
              )}
              
   
            </tbody>
            
          </table>
             {/* Show More button for certificates */}
      {!showAllCerts && certs.length > 5 && (
        <div className="w-1/2 flex justify-center mx-auto mt-4">
          <button
            className="mt-4 px-4 py-2 bg-transparent text-yellow-400 border border-yellow-400 rounded-lg shadow-md text-sm sm:text-base flex items-center gap-2 hover:bg-yellow-400 hover:text-black transition-colors"
            onClick={() => router.push('/certificates')}
          >
            Show More
            <span className="ml-1">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        </div>
      )}
        </div>
      </div>


      {/* Popup for all certificates removed. Now navigates to /certificates page. */}
    </>
  )
}
