import Navbar from '@/components/Navbar';
import { flats } from '@/lib/flats';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function FlatPage({ params }) {
  const { id } = await params;
  const flat = flats.find((f) => f.id === Number(id));

  if (!flat) notFound();

  return (
    <div className="min-h-screen bg-yellowish">
      <Navbar />

      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="bg-white overflow-hidden">
          <div className="relative" style={{ height: '360px' }}>
            <Image src={flat.image} fill alt={flat.name} className="object-cover" sizes="672px" />
          </div>

          <div className="p-8">
            <div className="flex justify-between items-baseline mb-6">
              <h1 className="text-3xl text-dark-red font-noto-bold">{flat.name}</h1>
              <span className="text-lg text-grey">{flat.area} M²</span>
            </div>

            <div className="border-t border-creamy pt-6 space-y-3">
              <p className="text-grey">აივანი: {flat.balcony} M²</p>
              <p className="text-grey">საცხოვრებელი: {flat.living} M²</p>
              <p className="text-grey">საძინებელი: {flat.bedroom}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
