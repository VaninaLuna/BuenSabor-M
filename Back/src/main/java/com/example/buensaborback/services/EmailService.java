package com.example.buensaborback.services;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmailWithAttachment(String to, String subject, String text, byte[] pdfBytes) throws MessagingException;
}
