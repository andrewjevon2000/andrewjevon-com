/* Menyisipkan JSON-LD sebagai <script type="application/ld+json"> di HTML server-rendered.
   Server component — tidak ada JS klien. */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify aman: data internal dari content.ts, bukan input user
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
