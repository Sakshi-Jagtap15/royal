import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

interface RSVP {
  id: string
  guest_name: string
  guest_email: string
  guest_count: number
  attending: boolean
}

const Dashboard = () => {
  const { slug } = useParams()
  const [guests, setGuests] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGuests = async () => {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .eq("invitation_slug", slug)

      if (!error && data) {
        setGuests(data)
      }

      setLoading(false)
    }

    fetchGuests()
  }, [slug])

  if (loading) {
    return <div className="p-10">Loading guest list...</div>
  }

  const attending = guests.filter(g => g.attending)
  const declined = guests.filter(g => !g.attending)

  return (
    <div className="min-h-screen bg-ivory p-10">
      <h1 className="text-3xl font-display mb-8">
        RSVP Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-white shadow">
          <h2>Total Guests</h2>
          <p className="text-2xl">{guests.length}</p>
        </div>

        <div className="p-6 bg-white shadow">
          <h2>Attending</h2>
          <p className="text-2xl">{attending.length}</p>
        </div>

        <div className="p-6 bg-white shadow">
          <h2>Declined</h2>
          <p className="text-2xl">{declined.length}</p>
        </div>
      </div>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Guests</th>
            <th className="p-3 text-left">Attending</th>
          </tr>
        </thead>

        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id} className="border-b">
              <td className="p-3">{guest.guest_name}</td>
              <td className="p-3">{guest.guest_email}</td>
              <td className="p-3">{guest.guest_count}</td>
              <td className="p-3">
                {guest.attending ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard