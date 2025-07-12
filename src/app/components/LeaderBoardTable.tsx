import React from "react";

interface LeaderBoard {
  wallet: string;
  allocation: string;
  rank: string;
  stage: number;
}

interface LeaderBoardTableProps {
  leaderBoards: LeaderBoard[];
}

export default function LeaderBoardTable({
  leaderBoards,
}: LeaderBoardTableProps) {
  return (
    <div className="overflow-x-auto" style={{width: '100%'}}>
      <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">SN</th>
            <th className="px-4 py-2 border-b">Users</th>
            <th className="px-4 py-2 border-b">Allocations ($NEOPM)</th>
            <th className="px-4 py-2 border-b">Ranks</th>
            <th className="px-4 py-2 border-b">Stages</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoards.map((leaderBoard, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{leaderBoard.wallet}</td>
              <td className="px-4 py-2 border-b">{Number(leaderBoard.allocation).toLocaleString()}</td>
              <td className="px-4 py-2 border-b">{leaderBoard.rank}</td>
              <td className="px-4 py-2 border-b">{leaderBoard.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
