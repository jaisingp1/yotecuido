-- Active: 1727891823102@@127.0.0.1@3306@yotecuido_db
CREATE DATABASE IF NOT EXISTS yotecuido_db;

USE yotecuido_db;

CREATE TABLE
    users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        location VARCHAR(255),
        avatar VARCHAR(255),
        user_type ENUM('client', 'caregiver') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_verified BOOLEAN DEFAULT FALSE
    );

CREATE TABLE
    caregivers (
        caregiver_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        category ENUM('ninos', 'mascotas', 'mayores') NOT NULL,
        experience VARCHAR(255),
        hourly_rate DECIMAL(10, 2),
        description TEXT,
        availability VARCHAR(255),
        is_available BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

CREATE TABLE
    services (
        service_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category ENUM('ninos', 'mascotas', 'mayores') NOT NULL,
        description TEXT
    );

CREATE TABLE
    caregiver_services (
        caregiver_id INT NOT NULL,
        service_id INT NOT NULL,
        PRIMARY KEY (caregiver_id, service_id),
        FOREIGN KEY (caregiver_id) REFERENCES caregivers(caregiver_id),
        FOREIGN KEY (service_id) REFERENCES services(service_id)
    );

CREATE TABLE
    bookings (
        booking_id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        caregiver_id INT NOT NULL,
        service_id INT NOT NULL,
        booking_date DATE NOT NULL,
        booking_time TIME NOT NULL,
        status ENUM(
            'pending',
            'confirmed',
            'completed',
            'cancelled'
        ) NOT NULL,
        price DECIMAL(10, 2),
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES users(user_id),
        FOREIGN KEY (caregiver_id) REFERENCES caregivers(caregiver_id),
        FOREIGN KEY (service_id) REFERENCES services(service_id)
    );

CREATE TABLE
    reviews (
        review_id INT AUTO_INCREMENT PRIMARY KEY,
        booking_id INT NOT NULL,
        rating INT NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
    );

CREATE TABLE
    favorites (
        favorite_id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        caregiver_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES users(user_id),
        FOREIGN KEY (caregiver_id) REFERENCES caregivers(caregiver_id)
    );

CREATE TABLE
    messages (
        message_id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_read BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (sender_id) REFERENCES users(user_id),
        FOREIGN KEY (receiver_id) REFERENCES users(user_id)
    );

CREATE TABLE
    caregiver_documents (
        document_id INT AUTO_INCREMENT PRIMARY KEY,
        caregiver_id INT NOT NULL,
        document_type VARCHAR(255) NOT NULL,
        document_url VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (caregiver_id) REFERENCES caregivers(caregiver_id)
    );

CREATE TABLE
    badges (
        badge_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT
    );

CREATE TABLE
    caregiver_badges (
        caregiver_id INT NOT NULL,
        badge_id INT NOT NULL,
        PRIMARY KEY (caregiver_id, badge_id),
        FOREIGN KEY (caregiver_id) REFERENCES caregivers(caregiver_id),
        FOREIGN KEY (badge_id) REFERENCES badges(badge_id)
    );