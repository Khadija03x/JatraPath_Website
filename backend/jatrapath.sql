SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `jatrapath`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `persons` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `days` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `name`, `location`, `image`, `price`, `days`, `description`) VALUES
(1, 'Sajek Valley Cloud Tour', 'Rangamati', 'https://i.pinimg.com/1200x/f5/d8/f3/f5d8f30b2a7eaf03604840c280e8401e.jpg', 4500, 3, NULL),
(2, 'Cox’s Bazar Beach Escape', 'Chattogram', 'https://i.pinimg.com/736x/af/92/61/af92611e33b7fde9ced5d7e764be0371.jpg', 6500, 4, NULL),
(3, 'Sylhet Tea Garden Experience', 'Sylhet', 'https://i.pinimg.com/736x/dc/b1/45/dcb145ea3bb2d5dca1bc7c0abdeb5178.jpg', 5200, 3, NULL),
(4, 'Bandarban Hill Adventure', 'Bandarban', 'https://i.pinimg.com/736x/2f/e0/d7/2fe0d70ae2737f1f2e9f6ec00e0ddbad.jpg', 7000, 5, NULL),
(5, 'Sundarbans Mangrove Safari', 'Khulna', 'https://i.pinimg.com/736x/0c/59/57/0c5957a5273fe8b793397bcf375475b5.jpg', 5800, 4, NULL),
(6, 'Saint Martin Island Trip', 'Cox’s Bazar', 'https://i.pinimg.com/736x/f0/e3/29/f0e329c502eb0e24a77712493f8b6aec.jpg', 8000, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `giftcard_orders`
--

CREATE TABLE `giftcard_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(20) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_giftcards`
--

CREATE TABLE `user_giftcards` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `giftcard_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `giftcard_orders`
--
ALTER TABLE `giftcard_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_giftcards`
--
ALTER TABLE `user_giftcards`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `giftcard_orders`
--
ALTER TABLE `giftcard_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user_giftcards`
--
ALTER TABLE `user_giftcards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;