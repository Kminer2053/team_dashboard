import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";

const initialEvents = [
  { title: "회의", date: "2025-04-07", time: "10:00" },
  { title: "보고서 마감", date: "2025-04-09", time: "17:00" }
];

const fetchMockContent = (keyword) => [`${keyword} 관련 뉴스 1`, `${keyword} 관련 웹페이지 2`, `${keyword} 관련 자료 3`];

function KeywordSection({ title }) {
  const [keyword, setKeyword] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (keyword) {
        const result = fetchMockContent(keyword);
        setContent(result);
      }
    }, 60 * 60 * 1000); // 매 시간마다
    return () => clearInterval(interval);
  }, [keyword]);

  return (
    <Card className="p-4 shadow-xl rounded-2xl bg-white h-full relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={() => setInputVisible(!inputVisible)}>
          <Settings2 className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
      {inputVisible && (
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="키워드 입력"
          className="border px-2 py-1 mb-3 w-full text-sm rounded"
        />
      )}
      <CardContent>
        {keyword ? (
          content.length > 0 ? (
            <ul className="text-sm list-disc ml-4 space-y-1">
              {content.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
          )
        ) : (
          <p className="text-gray-500 text-sm">키워드를 지정해 주세요.</p>
        )}
      </CardContent>
    </Card>
  );
}

function getCalendarDays(year, month) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const days = [];
  const startDay = startDate.getDay();
  const totalDays = endDate.getDate();

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  return days;
}

function CustomCalendar({ events, onAddEvent, onDeleteEvent }) {
  const year = 2025;
  const month = 3; // April (0-based)
  const days = getCalendarDays(year, month);

  const handleDayClick = async (day) => {
    const title = prompt("일정 제목을 입력하세요:");
    if (!title) return;
    const time = prompt("시간을 입력하세요 (예: 14:00):", "09:00");
    if (!time) return;

    const date = `2025-04-${day.toString().padStart(2, '0')}`;
    const newEvent = { title, date, time };
    onAddEvent(newEvent);
  };

  return (
    <div className="border rounded-lg overflow-hidden w-full">
      <div className="bg-blue-100 text-blue-900 font-semibold text-center py-2">2025년 4월</div>
      <div className="grid grid-cols-7 text-sm text-center">
        {['일','월','화','수','목','금','토'].map(d => (
          <div key={d} className="bg-gray-100 p-1 border">{d}</div>
        ))}
        {days.map((day, i) => {
          const dateStr = day ? `2025-04-${day.toString().padStart(2, '0')}` : '';
          const event = events.find(e => e.date === dateStr);
          return (
            <div
              key={i}
              className="h-24 border p-1 text-left cursor-pointer hover:bg-blue-50"
              onClick={() => day && handleDayClick(day)}
            >
              {day && (
                <>
                  <div className="text-xs font-bold flex justify-between">
                    <span>{day}</span>
                    {event && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`'${event.title}' 일정을 삭제할까요?`)) {
                            onDeleteEvent(event);
                          }
                        }}
                        className="text-red-500 text-xs hover:underline"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  {event && (
                    <div className="text-xs text-red-500 mt-1">
                      • {event.title} ({event.time})
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Dashboard() {
  const [events, setEvents] = useState(initialEvents);

  const handleAddEvent = (event) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleDeleteEvent = (targetEvent) => {
    setEvents((prev) => prev.filter(e => !(e.date === targetEvent.date && e.title === targetEvent.title)));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">🌐 미래성장처 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card className="p-4 shadow-xl rounded-2xl bg-white h-full">
            <h2 className="text-xl font-semibold mb-2">📅 업무일정표</h2>
            <CardContent>
              <CustomCalendar
                events={events}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
              />
              <p className="mt-2 text-sm text-gray-500">
                일정 제목과 시간을 입력하고 관리할 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <div><KeywordSection title="⚠ 리스크이슈 모니터링" /></div>
        <div><KeywordSection title="🤝 제휴처 탐색" /></div>
        <div><KeywordSection title="🚀 신기술 동향" /></div>
      </div>
    </div>
  );
}

export default Dashboard;
