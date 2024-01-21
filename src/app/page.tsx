export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <button className='rounded-sm border-2 border-black p-6 hover:bg-gray-200'>
        <a href={process.env.NEXT_PUBLIC_AUTH_URL}>노션 연동하기</a>
      </button>
    </main>
  );
}
