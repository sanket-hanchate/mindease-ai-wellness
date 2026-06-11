import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import VideoChat from "@/pages/VideoChat";

export const Route =
  createFileRoute("/video-chat")({
    component: () => (
      <ProtectedRoute>
        <VideoChat />
      </ProtectedRoute>
    ),
  });