export async function getData() {
  const res = await fetch('http://localhost:3000/api/rss')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  const rssFeedXML = await res.text();

  return {
	  rssFeedXML,
	  };
}
 
export default async function Page() {
  const data = await getData()
 
  return <main>
	<textarea value={data.rssFeedXML} readOnly />
  </main>
}
