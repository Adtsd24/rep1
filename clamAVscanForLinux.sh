#!/bin/bash

# Mount Partitions
if [ ! -d /mnt/sda1 ]; then
  sudo mkdir /mnt/sda1
fi

if [ ! -d /mnt/sda2 ]; then
  sudo mkdir /mnt/sda2
fi

if [ ! -d /mnt/sda3 ]; then
  sudo mkdir /mnt/sda3
fi

if [ -b /dev/sda1 ]; then
  sudo mount /dev/sda1 /mnt/sda1
  if [ $? -ne 0 ]; then
    echo "Error: Failed to mount /dev/sda1"
  else
    ls -l /mnt/sda1
  fi
fi

if [ -b /dev/sda2 ]; then
  sudo mount /dev/sda2 /mnt/sda2
  if [ $? -ne 0 ]; then
    echo "Error: Failed to mount /dev/sda2"
  else
    ls -l /mnt/sda2
  fi
fi

if [ -b /dev/sda3 ]; then
  sudo mount /dev/sda3 /mnt/sda3
  if [ $? -ne 0 ]; then
    echo "Error: Failed to mount /dev/sda3"
  else
    ls -l /mnt/sda3
  fi
fi

# Update ClamAV Definitions
sudo freshclam

# Scan Partitions
if [ -d /mnt/sda1 ]; then
  sudo clamscan /mnt/sda1
fi

if [ -d /mnt/sda2 ]; then
  sudo clamscan /mnt/sda2
fi

if [ -d /mnt/sda3 ]; then
  sudo clamscan /mnt/sda3
fi
