export default function RegistrationForm({ name, role, setName, setRole }: { name: string, role: string, setName: (name: string) => void, setRole: (role: string) => void }) {
  return <div className="bg-black rounded-2xl max-w-3xl">
    <div className="px-12 py-12 flex flex-col gap-3">
      <span className="font-thin"> Name </span>
      <input type="text" value={name} placeholder="Name" className='border border-gray-100 rounded-lg text-black p-2' onChange={(e) => setName(e.target.value)} />
      <span className="font-thin"> Role </span>
      <select className='border border-gray-100 text-black p-2 rounded-lg' defaultValue={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Guest">Guest</option>
        <option value="Speaker">Speaker</option>
        <option value="Volunteer">Volunteer</option>
      </select>
    </div>
  </div>;
}