import Link from "next/link";
import { getEvents } from "./lib/api";
import DeleteEventButton from "./components/DeleteEventButton";

export default async function HomePage() {
  const events = await getEvents();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* HEADER */}

      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Event
          </h1>

          <p className="mt-2 text-gray-600">
            Temukan dan pesan tiket event favoritmu.
          </p>
        </div>

        <Link
          href="/events/create"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah Event
        </Link>
      </div>

      {/* EMPTY STATE */}

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="text-gray-500">
            Belum ada event.
          </p>

          <Link
            href="/events/create"
            className="mt-4 inline-block font-medium underline"
          >
            Tambah event pertama
          </Link>
        </div>
      ) : (
        /* EVENT LIST */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.publicId}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {event.title}
              </h2>

              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                {event.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-medium">
                    Lokasi:
                  </span>{" "}
                  {event.location}
                </p>

                <p>
                  <span className="font-medium">
                    Tanggal:
                  </span>{" "}
                  {new Date(
                    event.eventDate
                  ).toLocaleString("id-ID")}
                </p>
              </div>

              {/* ACTIONS */}

              <div className="mt-6 flex gap-2">
                <Link
                  href={`/events/${event.publicId}`}
                  className="flex-1 rounded-lg border px-4 py-2 text-center text-sm font-medium hover:bg-gray-50"
                >
                  Detail
                </Link>

                <Link
                  href={`/events/${event.publicId}/edit`}
                  className="flex-1 rounded-lg border px-4 py-2 text-center text-sm font-medium hover:bg-gray-50"
                >
                  Edit
                </Link>
                <DeleteEventButton publicId={event.publicId} />
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}