import {QRCodeSVG} from 'qrcode.react';
export default function ProfileCard({ userData }: { userData: any }) {
  return <div className="bg-black rounded-2xl max-w-3xl">
    <div className="px-12 flex flex-col gap-6 mx-auto">
      <QRCodeSVG value="https://cu-fest-frontend.vercel.app/profile" className='border border-gray-100'/>
    </div>
    <div className="px-12 py-12 flex flex-col gap-6">
      <span className="font-thin"> Name: <span className="font-bold">{userData?.firstName} {userData?.lastName}</span></span>
      <span className="font-thin"> Email: <span className="font-bold">{userData?.email}</span></span>
      <span className="font-thin"> Github: <span className="font-bold">{userData?.githubAccount}</span></span>
    </div>
  </div>;
}