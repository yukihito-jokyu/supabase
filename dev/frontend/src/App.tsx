import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {
  // const [message, setMessage] = useState<string>("");

  // useEffect(() => {
  //   // API呼び出し
  //   axios.get("http://localhost:8000/api/hello")
  //     .then((response) => {
  //       setMessage(response.data.message);
  //     })
  //     .catch((error) => {
  //       console.error("API呼び出しエラー:", error);
  //     });
  // }, []);

  const [instruments, setInstruments] = useState<any[]>([]);
  useEffect(() => {
    getInstruments();
  }, []);
  async function getInstruments() {
    const { data, error } = await supabase.from("users").select();
    console.log(error)
    console.log(data)
    if (data) {
      setInstruments(data);
    } else {
      setInstruments([]); // エラーハンドリングの一部として空配列をセット
    }
  }

  return (
    <div>
      {/* <h1>FastAPIからのメッセージ:</h1>
      <p>{message}</p> */}
      <ul>
        {instruments.map((instrument) => (
          <li key={instrument.id}>{instrument.created_at}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
