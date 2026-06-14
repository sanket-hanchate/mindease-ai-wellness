import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import VideoChat from "@/pages/VideoChat";
import "@/styles/avatar.css";


export const Route =
  createFileRoute("/video-chat")({
    component: () => (
      <ProtectedRoute>
        <VideoChat />
      </ProtectedRoute>
    ),
  });
