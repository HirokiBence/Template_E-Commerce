type Props = {
  searchParams: Promise<{session_id?: string}>
}

export default async function Page({ searchParams }: Props){
  const { session_id } = await searchParams;

  return(
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">ご購入ありがとうございます</h1>
      <p className="mt-4">注文が完了しました。確認メールをお待ちください。</p>
      {session_id && (<p className="mt-2 text-xs text-gray-500">Session ID: {session_id}</p>)}
    </div>
  );
}